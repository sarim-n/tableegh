import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdminRequest } from "@/lib/auth";

// Protected route: update resource
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
      type,
      category,
      author,
      duration,
      link,
      date,
    } = body;

    // Check if resource exists
    const existingResource = await prisma.resource.findUnique({
      where: { id },
    });

    if (!existingResource) {
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 }
      );
    }

    const updatedResource = await prisma.resource.update({
      where: { id },
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

    return NextResponse.json(updatedResource);
  } catch (error) {
    console.error("PUT resource error:", error);
    return NextResponse.json(
      { error: "Failed to update resource" },
      { status: 500 }
    );
  }
}

// Protected route: delete resource
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

    // Check if resource exists
    const existingResource = await prisma.resource.findUnique({
      where: { id },
    });

    if (!existingResource) {
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 }
      );
    }

    await prisma.resource.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE resource error:", error);
    return NextResponse.json(
      { error: "Failed to delete resource" },
      { status: 500 }
    );
  }
}
