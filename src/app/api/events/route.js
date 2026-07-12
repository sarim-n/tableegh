import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdminRequest } from "@/lib/auth";

// Public route: fetch all events
export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        date: "asc",
      },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("GET events error:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

// Protected route: create event
export async function POST(request) {
  try {
    const admin = await verifyAdminRequest();
    if (!admin) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      titleEn,
      titleUr,
      descriptionEn,
      descriptionUr,
      locationEn,
      locationUr,
      category,
      date,
      endDate,
      time,
    } = body;

    // Validation
    if (!titleEn || !titleUr || !locationEn || !locationUr || !category || !date) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const event = await prisma.event.create({
      data: {
        titleEn,
        titleUr,
        descriptionEn,
        descriptionUr,
        locationEn,
        locationUr,
        category,
        date,
        endDate,
        time,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("POST event error:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
