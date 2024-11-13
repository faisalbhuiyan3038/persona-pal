import { Navbar } from "@/components/navbar";
import { SignedIn, UserButton } from "@clerk/nextjs";

const RootLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (

    <div className="h-full">
      <Navbar />
      <main className="md:pl-20 pt-16 h-full">
        <SignedIn>
          <UserButton />
        </SignedIn>
        {children}
      </main>
    </div>

  );
}

export default RootLayout;
