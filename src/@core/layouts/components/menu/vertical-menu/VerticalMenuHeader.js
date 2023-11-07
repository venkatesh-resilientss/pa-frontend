// ** React Imports
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

// ** Icons Imports
import { Disc, X, Circle } from "react-feather";

// ** Config
import themeConfig from "@configs/themeConfig";
import LogoR from "../../../../../assets/MyImages/logoR.svg";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const VerticalMenuHeader = (props) => {
  // ** Props
  const {
    menuCollapsed,
    setMenuCollapsed,
    setMenuVisibility,
    setGroupOpen,
    menuHover,
  } = props;

  // ** Reset open group
  useEffect(() => {
    if (!menuHover && menuCollapsed) setGroupOpen([]);
  }, [menuHover, menuCollapsed]);

  // ** Menu toggler component
  const Toggler = () => {
    if (!menuCollapsed) {
      return (
        <BsChevronLeft
          size={14}
          data-tour="toggle-icon"
          className="text-primary toggle-icon d-none d-xl-block "
          onClick={() => setMenuCollapsed(true)}
        />
      );
    } else {
      return (
        <BsChevronRight
          size={14}
          data-tour="toggle-icon"
          className="text-primary toggle-icon d-none d-xl-block"
          onClick={() => setMenuCollapsed(false)}
        />
      );
    }
  };

  return (
    <div className="navbar-header">
      <ul className="nav navbar-nav flex-row">
        <li className="nav-item me-auto">
          <NavLink to="/" className="brand-text d-flex justify-content-center">
            <span className="brand-logo">
              {menuCollapsed && !menuHover ? (
                <img src={LogoR} alt="logo" />
              ) : (
                <img
                  className="ms-3 "
                  src={themeConfig.app.appLogoImage}
                  alt="logo"
                  style={{ width: "100px", height: "37.67px" }}
                />
              )}
            </span>
            {/* <h2 className="brand-text mb-0">{themeConfig.app.appName}</h2> */}
          </NavLink>
        </li>

        <li className="nav-item nav-toggle">
          <div className="nav-link modern-nav-toggle cursor-pointer">
            <Toggler />
            <X
              onClick={() => setMenuVisibility(false)}
              className="toggle-icon icon-x d-block d-xl-none"
              size={20}
            />
          </div>
        </li>
        <hr />
      </ul>

      <div className="nav-link modern-nav-toggle cursor-pointer">
        <Toggler />
        <X
          onClick={() => setMenuVisibility(false)}
          className="toggle-icon icon-x d-block d-xl-none"
          size={20}
        />
      </div>
    </div>
  );
};

export default VerticalMenuHeader;
