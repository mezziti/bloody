import NavLink from "@/Components/NavLink";
import { navBarLinksData } from "./data/navBarLinksData";
const NavBarLinks = () => {
  const NavLinks = navBarLinksData;
  return (
    <nav className="grid items-start px-2 text-xl font-medium lg:px-4">
      {NavLinks.map((link, index) => {
        return (
          <NavLink
            key={index}
            className={
              index < NavLinks.length - 1
                ? "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all"
                : "flex items-center mb-12 gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all"
            }
            href={route(link.route)}
            active={route().current(link.route)}
          >
            {link.icon}
            {link.name}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default NavBarLinks;
