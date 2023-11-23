import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { sidebarRoutes } from "constants/common";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Card } from "react-bootstrap";
import { AuthService } from "services";
const Sidebar = ({props}) => {
  const router = useRouter();
  const [showSidebar, setSidebar] = useState(true); // min - full;
  const toggleSidebar = () => {
    if (!showSidebar && childRoute) handleDropDownChange(parentRoute);
    setSidebar(!showSidebar);
  };
  const [activeDropDown, setActiveDropDown] = useState(null);
  const [parentRoute, setParentRoute] = useState(null);
  const [childRoute, setChildRoute] = useState(null);
  const handleDropDownChange = (path) => {
    setActiveDropDown(path);
  };
  /**
   * User Profile
   */
  const authService = new AuthService();
  const handleLogout = () => {
    authService.logout();
    router.push("/");
  };
  useEffect(() => {
    /**get route names */
    const routeNames = router.pathname.split("/").filter((name) => name != "");

    setParentRoute(`/${routeNames[0]}`);
    if (routeNames[1]) {
      setChildRoute(`/${routeNames[1]}`);
      handleDropDownChange(`/${routeNames[0]}`);
    } else {
      setChildRoute(null);
    }
  }, [router.pathname]);

  const IconLink = ({ title, children, placement }) => (
    <OverlayTrigger
      placement={placement}
      overlay={
        <Tooltip>
          <p className="text-sm">{title}</p>
        </Tooltip>
      }
    >
      {children}
    </OverlayTrigger>
  );
  /**
   *
   * @param {route} => route - 
   * { 
      name : 'route name',
      icon : 'icon url',
      paht : 'relative path to the route',
      children : [
        {name : '', path : ''},
        ...
      ]
   * }
   * @returns route button
   */
  const SideBarRoute = ({ route }) => {
    return (
      <div
        className={`route-button my-2 ${
          parentRoute === route.path ? "active" : ""
        }`}
      >
        {showSidebar ? (
          <div
            className="d-flex align-items-center justify-content-between  cursor-pointer select-btn"
            onClick={() => {
              if (route.children) {
                handleDropDownChange((prev) =>
                  prev === route.path ? null : route.path
                );
              } else handleDropDownChange(null);
            }}
          >
            {route.children ? (
              <div className="d-flex gap-2 cursor-pointer">
                <img
                  src={route.icon}
                  alt=""
                  width={14}
                  style={{ filter: "brightness(0)" }}
                />
                <p className={`route-name`}>{route.name}</p>
              </div>
            ) : (
              <Link
                className="d-flex gap-2"
                href={route.children ? "" : route.path}
              >
                <img
                  src={route.icon}
                  alt=""
                  width={14}
                  style={{ filter: "brightness(0)" }}
                />
                <p className={`route-name`}>{route.name}</p>
              </Link>
            )}
            {route.children ? (
              <div className="" onClick={() => {}}>
                <img
                  src="/icons/arrow-left.svg"
                  alt=""
                  style={{
                    transform: `${
                      activeDropDown === route.path
                        ? "rotate(90deg)"
                        : "rotate(-90deg)"
                    }`,
                    transformOrigin: "center center",
                  }}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div
            className="d-flex gap-2 cursor-pointer justify-content-center"
            onClick={() => {
              if (route.children) {
                toggleSidebar();
                setActiveDropDown(route.path);
              }
            }}
          >
            <IconLink
              // handleClick={() => {
              //   router.push(route.path);
              // }}
              title={route.name}
              placement={"right"}
            >
              {route.children ? (
                <img src={route.icon} alt="" width={14} />
              ) : (
                <Link href={route.path}>
                  <img src={route.icon} alt="" width={14} />
                </Link>
              )}
            </IconLink>
          </div>
        )}
        {/* Route children */}

        {route.children && activeDropDown === route.path ? (
          <>
            <div className="ps-3">
              <ul>
                {route.children.map((child, i) => {
                  const fullPath = `${route.path}${child.path}`;
                  return (
                    <li
                      className="py-1 cursor-pointer"
                      // onClick={() => {
                      //   router.push(child.path);
                      // }}
                      key={`sidebar-list-child-${child.name}-${i}`}
                    >
                      <Link
                        href={fullPath}
                        className={` child-route-name ${
                          child.path === childRoute ? "active" : ""
                        }`}
                      >
                        {child.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    );
  };
  return (
    <div
      className={`d-flex flex-column sidebar justify-content-between ${
        showSidebar ? "" : "minimized"
      }`}
    >
      <div>
        <div className="pb-2 px-2 d-flex gap-2 justify-content-between align-items-center">
          <div>
            {showSidebar ? (
              <img src="/logo.svg" width={100} alt="" />
            ) : (
              <img src="/icons/logo-dark.svg" width={25} />
            )}
          </div>
          <div
            onClick={() => {
              toggleSidebar();
              handleDropDownChange(null);
            }}
            className="cursor-pointer"
          >
            <img
              src="/icons/arrow-left.svg"
              alt=""
              width={22}
              style={{
                transform: `${showSidebar ? "rotate(0deg)" : "rotate(180deg)"}`,
                filter: `${showSidebar ? "" : "invert(100%)"}`,
              }}
            />
          </div>
        </div>
        <hr />
        {/* Drop downs */}
        <div className="px-2">
          {sidebarRoutes.map((route, i) => {
            return <SideBarRoute route={route} key={`sidebar-route-${i}`} />;
          })}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bottom-bar mb-2">
        <hr />
        {/* Help Button */}
        <div className="d-flex py-2 align-items-center justify-content-between my-1 select-btn">
          <div className="d-flex align-items-center">
            <img src="/icons/help.svg" width={14} className="me-2" alt="" />
            {showSidebar ? <p>Need Help ?</p> : ""}
          </div>
          {
            <div className="cursor-pointer">
              <img src="/icons/more_horiz.svg" alt="" />
            </div>
          }
        </div>
        {/* Profile Button */}
        <div className="d-flex py-2 align-items-center justify-content-between my-1 select-btn">
          <div className="d-flex align-items-center">
            <div>
              <img
                src={
                  props.profileImg
                    ? props.profileImg
                    : "/icons/sample-profile.png"
                }
                width={22}
                className="me-2"
                alt=""
              />
            </div>
            {showSidebar ? <p>{props.name ? props.name : "-"}</p> : ""}
          </div>

          <OverlayTrigger
            placement={"right"}
            trigger={"click"}
            rootClose
            overlay={
              <Tooltip bsPrefix="custom-tooltip">
                <Card>
                  <div className="px-3 py-2 d-flex flex-column gap-1">
                    <Link
                      href="/my-profile"
                      className="d-flex gap-2 align-item-center cursor-pointer"
                    >
                      <img src="/icons/profile.svg" width={14} alt="" />
                      <p>My Profile</p>
                    </Link>
                    <div
                      onClick={handleLogout}
                      className="d-flex gap-2 align-item-center cursor-pointer"
                    >
                      <img src="/icons/logout.svg" width={14} alt="" />
                      <p>Logout</p>
                    </div>
                  </div>
                </Card>
              </Tooltip>
            }
          >
            <img
              src="/icons/more_horiz.svg"
              className="cursor-pointer"
              alt=""
            />
          </OverlayTrigger>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
