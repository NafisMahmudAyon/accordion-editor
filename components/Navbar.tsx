import { Navbar as NavbarComponent, NavbarContainer } from 'aspect-ui/Navbar';
import Logo from './Logo';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

const Navbar = () => {
  return (
    <NavbarComponent collapseBreakpoint="md">
      <NavbarContainer>
        <Logo />
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </NavbarContainer>
    </NavbarComponent>
  );
};

export default Navbar;
