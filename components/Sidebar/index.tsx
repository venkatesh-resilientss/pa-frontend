import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  sidebarRoutesMaster,
  sidebarRoutesNonStaff,
  sidebarRoutesProduction,
} from "constants/common";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Card, Image } from "react-bootstrap";
import { AuthService, ClientsService } from "services";
import { Input } from "reactstrap";
import useSWR from "swr";
import { hasPermission } from "commonFunctions/functions";

const Sidebar = ({ props }) => {
  const router = useRouter();
  const [showSidebar, setSidebar] = useState(true); // min - full;
  const toggleSidebar = () => {
    if (!showSidebar && childRoute) handleDropDownChange(parentRoute);
    setSidebar(!showSidebar);
  };
  // const [searchText, setSearchText] = useState("");
  const authService = new AuthService();
  const clientService = new ClientsService();
  const [activeDropDown, setActiveDropDown] = useState(null);
  const [parentRoute, setParentRoute] = useState(null);
  const [childRoute, setChildRoute] = useState(null);
  const [productionList, setProductionList] = useState(false);
  const [selectedProduction, setSelectedProduction] = useState() as any;
  const [clickedItemIndex, setClickedItemIndex] = useState(null);
  const divRef: any = useRef();

  const handleDropDownChange = (path) => {
    setActiveDropDown(path);
  };
  const { data: userData } = useSWR("GET_USER_DETAILS", () =>
    authService.getUserDetails()
  );

  const { data: productionData } = useSWR("GET_PRODUCTION_LIST", () =>
    clientService.getProductions()
  );

  const hasViewConfiguration = hasPermission(
    "configuration_management",
    "view_all_configurations"
  );
  // const hasViewProduction = hasPermission(
  //   "production_management",
  //   "view_all_productions"
  // );

  // const hasViewUsers = hasPermission(
  //   "user_and_role_management",
  //   "view_all_users"
  // );
  const hasViewRoles = hasPermission(
    "user_and_role_management",
    "view_all_roles"
  );
  // const hasViewClients = hasPermission("client_management", "view_all_clients");

  /**
   * User Profile
   */
  const handleLogout = () => {
    authService.logout();
    props.mutate();
    window.location.href = `http://app.${process.env.NEXT_PUBLIC_REDIRECT}/?reset=true`;
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
              <div className="">
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
          <div className="sidebar-list">
            <div className="ps-4">
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
          </div>
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
      <div className="">
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
        <hr className="mt-2 mb-2" />
        {/* Drop downs */}
        <div
          className={"sidenavDropdown"}
          onClick={() => {
            setProductionList(true);
          }}
        >
          {selectedProduction ? (
            <div className="d-flex align-items-center cursor-pointer flex-row">
              {showSidebar ? (
                <>
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="text-container text-center">
                      <div className="d-flex align-items-start">
                        <p className="home mt-1 cursor-pointer ellipsis">
                          {selectedProduction.Name}
                        </p>{" "}
                      </div>
                      <div className="d-flex align-items-start">
                        <p className="ressl cursor-pointer">
                          {selectedProduction.Client.Name
                            ? selectedProduction.Client.Name
                            : selectedProduction.Description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Image
                    src="/chevron-down.svg"
                    alt="project"
                    width="20"
                    height="24"
                    className="ms-auto me-2 cursor-pointer"
                  />
                </>
              ) : (
                <Image
                  src="/home.svg"
                  alt="project"
                  width="30"
                  height="35"
                  className="ms-2 me-2 cursor-pointer"
                />
              )}
            </div>
          ) : (
            <div className="d-flex align-items-center flex-row">
              {showSidebar ? (
                <>
                  {" "}
                  <Image
                    src="/home.svg"
                    alt="project"
                    width="30"
                    height="35"
                    className="ms-2 me-2"
                  />
                  <div className="d-flex flex-column cursor-pointer">
                    <div className="d-flex align-items-start">
                      <p className="home mt-1 cursor-pointer">Home</p>
                    </div>
                    <div className="d-flex mb-1 align-items-start">
                      <p className="ressl cursor-pointer">
                        Resillient Software Solutions
                      </p>
                    </div>
                  </div>
                  <Image
                    src="/chevron-down.svg"
                    alt="project"
                    width="20"
                    height="24"
                    className="ms-auto cursor-pointer me-2"
                  />
                </>
              ) : (
                <Image
                  src="/home.svg"
                  alt="project"
                  width="30"
                  height="35"
                  className="ms-2 me-2 cursor-pointer"
                />
              )}
            </div>
          )}
        </div>

        {productionList ? (
          <>
            <div className="container cursor-pointer p-0">
              <div className="d-flex align-items-center mt-2 flex-row">
                <Image
                  src="/home.svg"
                  alt="project"
                  width="20"
                  height="24"
                  className="ms-2 cursor-pointer me-2"
                />
                <div className="d-flex align-items-start ms-2">
                  <p
                    id="clicked"
                    ref={divRef}
                    className="home cursor-pointer"
                    onClick={() => {
                      setProductionList(false);
                      setSelectedProduction();
                    }}
                  >
                    Home
                  </p>
                </div>
              </div>
              <Input
                // onChange={(e) => setSearchText(e.target.value)}
                type="search"
                className="searchProduction mt-2 cursor-pointer"
                placeholder="Search Production"
                style={{ width: "217px", height: "38px" }}
              />

              {(productionData || [])?.map((item: any, index: any) => {
                const isClicked = index === clickedItemIndex;

                return (
                  <div
                    key={index}
                    ref={divRef}
                    className={`d-flex align-items-center cursor-pointer flex-row${
                      isClicked ? " clicked" : ""
                    }`}
                    onClick={() => {
                      setClickedItemIndex(index);
                      setSelectedProduction(item);
                      setProductionList(false);

                      sessionStorage.setItem("clientid", item.Client.ID);
                      sessionStorage.setItem("projectid", item.ID);
                    }}
                  >
                    <img
                      className="rounded-circle cursor-pointer me-2 ms-1"
                      src={item.img || "/icons/dummy-client-logo.svg"}
                      width="20"
                      height="20"
                      alt="avatar"
                      key={index}
                    />
                    <div className="d-flex flex-column">
                      <div className="d-flex align-items-start">
                        <p
                          className={`home cursor-pointer mt-1 ${
                            item?.Name.length > 5 ? "ellipsis" : ""
                          }`}
                        >
                          {item.Name}
                        </p>
                      </div>
                      <div className="d-flex mb-1 cursor-pointer align-items-start">
                        <p className="ressl">
                          {item.Client.Name
                            ? item.Client.Name
                            : item.Description}
                        </p>
                      </div>
                    </div>
                    {isClicked && (
                      <img
                        key={index}
                        className="ms-3 cursor-pointer"
                        src="/tick.svg"
                        alt="tickmark"
                        width="16"
                        height="16"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </>
        ) : userData?.data?.IsStaffUser ? (
          selectedProduction ? (
            <div className="px-2 mt-2 sidebar-body">
              {sidebarRoutesProduction.map((route, i) => {
                if (!hasViewConfiguration && route?.name !== "Configurations") {
                  return (
                    <SideBarRoute route={route} key={`sidebar-route-${i}`} />
                  );
                } else {
                  return (
                    <SideBarRoute route={route} key={`sidebar-route-${i}`} />
                  );
                }
              })}
            </div>
          ) : (
            <div className="px-2 mt-2 sidebar-body">
              {sidebarRoutesMaster.map((route, i) => {
                if (
                  userData?.data?.Role?.Code === "SUPER_ADMIN" ||
                  (userData?.data?.IsStaffUser && hasViewRoles)
                ) {
                  return (
                    <SideBarRoute route={route} key={`sidebar-route-${i}`} />
                  );
                } else {
                  const filteredChildren = route?.children?.filter(
                    (child) => child.name !== "Role Management"
                  );

                  // Create a new route object with filtered children
                  const filteredRoute = {
                    ...route,
                    children: filteredChildren,
                  };

                  // Use filteredRoute when rendering
                  return (
                    <SideBarRoute
                      route={filteredRoute}
                      key={`sidebar-route-${i}`}
                    />
                  );
                }
              })}
            </div>
          )
        ) : selectedProduction ? (
          <div className="px-2 mt-2 sidebar-body">
            {sidebarRoutesProduction.map((route, i) => {
              if (!hasViewConfiguration && route?.name !== "Configurations") {
                return (
                  <SideBarRoute route={route} key={`sidebar-route-${i}`} />
                );
              } else {
                return (
                  <SideBarRoute route={route} key={`sidebar-route-${i}`} />
                );
              }
            })}
          </div>
        ) : (
          <div className="px-2 mt-2 sidebar-body">
            {sidebarRoutesNonStaff.map((route: any, i) => {
              if (!hasViewConfiguration && route?.name !== "Configurations") {
                return (
                  <SideBarRoute route={route} key={`sidebar-route-${i}`} />
                );
              } else {
                return (
                  <SideBarRoute route={route} key={`sidebar-route-${i}`} />
                );
              }
            })}
          </div>
        )}
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
              {/* <img
                src={
                  props.profileImg
                    ? props.profileImg
                    : "/icons/sample-profile.png"
                }
                width={22}
                className="me-2"
                alt=""
              /> */}
              <img
                className="rounded-circle me-3"
                src={props.profileImg ? props.profileImg : "/newAvatar.svg"}
                width="32"
                height="32"
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
