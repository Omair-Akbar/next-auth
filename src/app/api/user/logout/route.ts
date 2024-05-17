import { NextResponse } from "next/server";

export async function GET(){
try {
    const res = NextResponse.json({
        message:"Logout successfully",
        success:true,
    },{status:200})
    res.cookies.set("token","",{httpOnly:true,expires:new Date(0) })
    return res
} catch (error) {
    return NextResponse.json({error:"Something went wrong"},{status:400})
}
}