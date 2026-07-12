import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdminRequest } from "@/lib/auth";

// Public route: fetch all resources
export async function GET() {
  try {
    const resources = await prisma.resource.findMany({
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json(resources);
  } catch (error) {
    console.error("GET resources error:", error);
    return NextResponse.json(
      { error: "Failed to fetch resources" },
      { status: 500 }
    );
  }
}

// Protected route: create resource
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
      type,
      category,
      author,
      duration,
      link,
      date,
    } = body;

    // Validation
    if (!titleEn || !titleUr || !type || !category || !link || !date) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const resource = await prisma.resource.create({
      data: {
        titleEn,
        titleUr,
        descriptionEn,
        descriptionUr,
        type,
        category,
        author,
        duration,
        link,
        date,
      },
    });

    return NextResponse.json(resource, { status: 201 });
  } catch (error) {
    console.error("POST resource error:", error);
    return NextResponse.json(
      { error: "Failed to create resource" },
      { status: 500 }
    );
  }
}
