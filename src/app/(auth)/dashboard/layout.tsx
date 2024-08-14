import Header from "@/components/custom/Header";
import SideNav from "@/components/custom/SideNav";
import { SignedIn } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <SignedIn>
            <div className="flex">
                <div className="">
                    <SideNav />
                </div>
                <div className="flex-1 px-5 py-2">
                    {children}
                </div>
            </div>
        </SignedIn>
  );
}
