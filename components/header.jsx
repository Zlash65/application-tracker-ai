"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  StarsIcon,
  FileText,
  PenBox,
  ClipboardList,
  ChevronDown,
  Menu,
} from "lucide-react";

const Header = () => {
  const toolsMenu = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center gap-2">
          <StarsIcon className="h-4 w-4" />
          <span className="hidden md:inline">Tools</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem asChild>
          <Link href="/resume" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Resume Builder
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/cover-letter" className="flex items-center gap-2">
            <PenBox className="h-4 w-4" />
            Cover Letter Builder
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/interview" className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            My Job Applications
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" aria-label="ZlashAI Home">
          <Image
            src="/logo.png"
            alt="ZlashAI Logo"
            width={140}
            height={40}
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <SignedIn>{toolsMenu}</SignedIn>

          <SignedOut>
            <SignInButton>
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button aria-label="Open Menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="mt-4 space-y-3">
                <SignedIn>
                  <div className="text-muted-foreground px-2">Tools</div>
                  <Link
                    href="/resume"
                    className="flex items-center gap-2 px-2 py-2 rounded hover:bg-muted"
                  >
                    <FileText className="h-4 w-4" />
                    Resume Builder
                  </Link>
                  <Link
                    href="/cover-letter"
                    className="flex items-center gap-2 px-2 py-2 rounded hover:bg-muted"
                  >
                    <PenBox className="h-4 w-4" />
                    Cover Letter Builder
                  </Link>
                  <Link
                    href="/interview"
                    className="flex items-center gap-2 px-2 py-2 rounded hover:bg-muted"
                  >
                    <ClipboardList className="h-4 w-4" />
                    My Job Applications
                  </Link>
                </SignedIn>

                <SignedOut>
                  <SignInButton>
                    <Button variant="outline" className="w-full mt-2">
                      Sign In
                    </Button>
                  </SignInButton>
                </SignedOut>

                <SignedIn>
                  <div className="pt-4">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </SignedIn>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Header;
