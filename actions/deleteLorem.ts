'use server'

import prisma from "@/lib/db";

export const deleteUser = async (id: number) => {
  try {
    await prisma.task.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    console.error('Error deleting user:', error);
    return { success: false };
  }
};