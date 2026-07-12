import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdminRequest } from "@/lib/auth";

// Protected route: update event
export async function PUT(request, { params }) {
  try {
    const admin = await verifyAdminRequest();
    if (!admin) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    const { id } = await params;
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

    // Check if event exists
    const existingEvent = await prisma.event.findUnique({
      where: { id },
    });

    if (!existingEvent) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    const updatedEvent = await prisma.event.update({
      where: { id },
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

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error("PUT event error:", error);
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}

// Protected route: delete event
export async function DELETE(request, { params }) {
  try {
    const admin = await verifyAdminRequest();
    if (!admin) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    const { id } = await params;

    // Check if event exists
    const existingEvent = await prisma.event.findUnique({
      where: { id },
    });

    if (!existingEvent) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    await prisma.event.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE event error:", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}
