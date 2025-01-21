"use client";
import Link from "next/link";
export default function Homepage() {
    return (
        <div className={` text-black flex items-center justify-center h-screen`}>
            <h1><Link href="/">Home</Link></h1>
        </div>
    )
}