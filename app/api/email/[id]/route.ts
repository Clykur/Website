import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/db/supabase";
import { EmailSchema } from "@/lib/types/email";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createClient();
    const { data, error } = await supabase
      .from("emails")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { message: `Error fetching email with id: ${id}` },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { message: `Email with id: ${id} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/email/[id] error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const validation = EmailSchema.partial().safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: "Invalid request body", errors: validation.error.issues },
        { status: 400 }
      );
    }

    const supabase = createClient();
    const { data, error } = await supabase
      .from("emails")
      .update(validation.data)
      .eq("id", id)
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { message: `Error updating email with id: ${id}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: `Email with id: ${id} updated successfully`, data },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT /api/email/[id] error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createClient();
    const { error } = await supabase.from("emails").delete().eq("id", id);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { message: `Error deleting email with id: ${id}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: `Email with id: ${id} deleted successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/email/[id] error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}