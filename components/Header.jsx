import { Show, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { checkUser } from "../lib/checkUser"

const Header = async () => {
    await checkUser();
    return (
        <header className='fixed top-0 w-full border-b bg-background/60  z-50 supports-backdrop-filter:bg-background/60'>
            <nav className=' px-4 h-16 container mx-auto flex items-center justify-between '>
                <Link href={"/"}>
                    <h1 className='text-2xl font-bold'>Medi<span className='text-blue-400'>Meet</span></h1>
                </Link>

                <div>
                    <Show when="signed-out">
                        <SignInButton>
                            <Button variant='secondary'>Sign In</Button>
                        </SignInButton>
                        
                    </Show>
                    <Show when="signed-in">
                        <UserButton 
                        appearance={{
                            elements:{
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