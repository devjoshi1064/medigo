import { Show, SignIn, SignInButton, UserButton } from "@clerk/nextjs";
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { checkUser } from "../lib/checkUser"
import { Calendar, CreditCard, ShieldCheckIcon, Stethoscope, User } from "lucide-react";
import { checkAndAllocateCredits } from "@/actions/credits";
import { Badge } from "./ui/badge";
import Image from "next/image";

const Header = async () => {
    const user = await checkUser();
    if (user?.role === "PATIENT") {
        await checkAndAllocateCredits(user);
    }
    return (
        <header className='fixed top-0 w-full border-b bg-background/60  z-50 supports-backdrop-filter:bg-background/60'>
            <nav className=' px-4 h-16 container mx-auto flex items-center justify-between '>
                <Link href={"/"} className="flex justify-baseline items-center">
                    <Image src={"/logo-single.png"} alt="MediGo" width={40} height={40} className="inline-block"/>
                    <h1 className='text-3xl font-bold inline-block'>edi<span className='text-emerald-400'>GO</span></h1>
                </Link>

                <div className="flex items-center space-x-3">
                    <Show when="signed-in">
                        {user?.role === "UNASSIGNED" && (
                            <Link href={"/onboarding"}>
                                <Button variant="outline" className="hidden md:inline-flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    Complete Profile
                                </Button>
                                <Button className="md:hidden w-10 h-10" variant="ghost">
                                    <User className="w-4 h-4" />
                                </Button>
                            </Link>
                        )}
                    </Show>
                    <Show when="signed-in">
                        {user?.role === "PATIENT" && (
                            <Link href={"/appointments"}>
                                <Button variant="outline" className="hidden md:inline-flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    My Appointments
                                </Button>
                                <Button className="md:hidden w-10 h-10" variant="ghost">
                                    <Calendar className="w-4 h-4" />
                                </Button>
                            </Link>
                        )}
                    </Show>
                    <Show when="signed-in">
                        {user?.role === "DOCTOR" && (
                            <Link href={"/doctor"}>
                                <Button variant="outline" className="hidden md:inline-flex items-center gap-2">
                                    <Stethoscope className="w-4 h-4" />
                                    Doctor Dashboard
                                </Button>
                                <Button className="md:hidden w-10 h-10" variant="ghost">
                                    <Stethoscope className="w-4 h-4" />
                                </Button>
                            </Link>
                        )}
                    </Show>
                    <Show when="signed-in">
                        {user?.role === "ADMIN" && (
                            <Link href={"/admin"}>
                                <Button variant="outline" className="hidden md:inline-flex items-center gap-2">
                                    <ShieldCheckIcon className="w-4 h-4" />
                                    Admin Dashboard
                                </Button>
                                <Button className="md:hidden w-10 h-10" variant="ghost">
                                    <ShieldCheckIcon className="w-4 h-4" />
                                </Button>
                            </Link>
                        )}
                    </Show>
                    <Show when="signed-out">
                        <SignInButton>
                            <Button variant='secondary'>Sign In</Button>
                        </SignInButton>
                    </Show>
                    {(!user || user?.role !== "ADMIN") && (
                        <Link href={user?.role === "PATIENT" ? "/pricing" : "/doctor"}>
                            <Badge
                                variant="outline"
                                className="h-9 bg-emerald-900/20 border-emerald-700/30 px-3 py-1 flex items-center gap-2"
                            >
                                <CreditCard className="h-3.5 w-3.5 text-emerald-400" />
                                <span className="text-emerald-400">
                                    {user && user.role !== "ADMIN" ? (
                                        <>
                                            {user.credits}{" "}
                                            <span className="hidden md:inline">
                                                {user?.role === "PATIENT"
                                                    ? "Credits"
                                                    : "Earned Credits"}
                                            </span>
                                        </>
                                    ) : (
                                        <>Pricing</>
                                    )}
                                </span>
                            </Badge>
                        </Link>
                    )}
                    <Show when="signed-in">
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "w-10 h-10 rounded-full",
                                    userButtonPopoverCard: "shadow-xl",
                                    userPreviewMainIdentification: "font-semibold"
                                }
                            }}
                        />
                    </Show>
                </div>
            </nav>
        </header>
    )
}

export default Header