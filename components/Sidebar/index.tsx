import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Card,
  Image,
  Modal,
  OverlayTrigger,
  Popover,
  Tooltip,
  Button,
} from "react-bootstrap";
import cookie from "js-cookie";

import {
  sidebarRoutesMaster,
  sidebarRoutesNonStaff,
  sidebarRoutesProduction,
} from "constants/common";
import { AuthService, ClientsService } from "services";
import { Input } from "reactstrap";
import useSWR from "swr";
import { hasPermission } from "commonFunctions/functions";
import { useDispatch, useSelector } from "react-redux";

import {
  productionsRefetch,
  refetchProductions,
} from "@/redux/slices/mySlices/productions";

const Sidebar = ({ props }) => {
  const router = useRouter();

  const refetch = useSelector(productionsRefetch);
  const dispatch = useDispatch();

  const [showSidebar, setSidebar] = useState(true); // min - full;
  const toggleSidebar = () => {
    if (!showSidebar && childRoute) handleDropDownChange(parentRoute);
    setSidebar(!showSidebar);
    if (showSidebar) {
      // setProductionList(false);
      setSelectedProduction();
    }
  };
  // const { clientID, projectID } = getSessionVariables();

  const [switcProduction, setSwitcProduction] = useState(false);

  const authService = new AuthService();
  const clientService = new ClientsService();
  const [activeDropDown, setActiveDropDown] = useState(null);
  const [parentRoute, setParentRoute] = useState(null);
  const [childRoute, setChildRoute] = useState(null);
  const [productionList, setProductionList] = useState(false);
  const [selectedProduction, setSelectedProduction] = useState() as any;
  const [clickedItemIndex, setClickedItemIndex] = useState<number | null>(null);

  const [temp1, setTemp1] = useState() as any;
  const [temp2, setTemp2] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [productionData, setProductionData] = useState() as any;
  const handleDropDownChange = (path) => {
    setActiveDropDown(path);
  };
  const { data: userData } = useSWR("GET_USER_DETAILS", () =>
    authService.getUserDetails()
  );

  // const { data: productionData } = useSWR("GET_PRODUCTION_LIST", () =>
  //   clientService.getProductions(searchText)
  // );

  const hasViewConfiguration = hasPermission(
    "configuration_management",
    "view_all_configurations"
  );
  const hasViewProduction = hasPermission(
    "production_management",
    "view_all_productions"
  );

  const hasViewUsers = hasPermission(
    "user_and_role_management",
    "view_all_users"
  );
  const hasViewRoles = hasPermission(
    "user_and_role_management",
    "view_all_Roles"
  );

  const hasViewClients = hasPermission("client_management", "view_all_clients");
  const hasViewPayments = hasPermission(
    "payments_management",
    "view_all_payments"
  );
  const hasViewReports = hasPermission(
    "reports_management",
    "view_all_reports"
  );
  const hasViewTranscations = hasPermission(
    "transaction_management",
    "view_all_transactions"
  );

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
    if (routeNames[0] === "productions") {
      const lastRoute = routeNames[routeNames.length - 1];
      setParentRoute(`/${lastRoute}`);
    } else {
      setParentRoute(`/${routeNames[0]}`);
    }

    if (routeNames[1]) {
      setChildRoute(`/${routeNames[1]}`);
      handleDropDownChange(`/${routeNames[0]}`);
    } else {
      setChildRoute(null);
    }
  }, [router.pathname]);

  const getProductionsList = (searchText) => {
    clientService.getProductions(searchText).then((res) => {
      setProductionData(res);
    });
  };

  useEffect(() => {
    // Check if productionData is an array and has exactly one item
    if (!userData?.data?.IsStaffUser && productionData?.length === 1) {
      // Access the first item in the array
      const temp1 = productionData[0];

      // Check if temp1 is defined and has an ID property
      if (temp1 && temp1.ID) {
        // Redirect to the dashboard of the single production
        router.push(`/productions/${temp1.ID}/dashboard`);
      }
    }
  }, [productionData]);
  useEffect(() => {
    if (cookie.get("accessToken")) {
      getProductionsList(searchText);
    }
  }, [searchText, cookie.get("accessToken")]);

  useEffect(() => {
    if (refetch) {
      getProductionsList(searchText);

      // Reset refresh status
      dispatch(refetchProductions(false));
    }
  }, [refetch]);

  useEffect(() => {
    const storedIndex = localStorage.getItem("clickedItemIndex");
    if (storedIndex !== null) {
      setClickedItemIndex(parseInt(storedIndex, 10));
    }
  }, []);

  useEffect(() => {
    const storedSelectedProduction = localStorage.getItem("selectedProduction");
    if (storedSelectedProduction) {
      setSelectedProduction(JSON.parse(storedSelectedProduction));
    }
  }, []);

  // Function to handle selection and store in localStorage
  const handleProductionSelection = (production) => {
    setSelectedProduction(production);

    // Store the selected production in localStorage
    localStorage.setItem("selectedProduction", JSON.stringify(production));
  };

  // Function to clear selection and remove from localStorage
  const clearProductionSelection = () => {
    setSelectedProduction(null);
    setTemp1(null);
    setTemp2(null);

    // Remove the selected production from localStorage
    localStorage.removeItem("selectedProduction");
    localStorage.removeItem("clickedItemIndex");
  };
  // Function to handle item click
  const handleItemClick = (item: any, index: any) => {
    setTemp1(item);
    setTemp2(index);

    // Toggle clicked state
    if (index !== clickedItemIndex) {
      setSwitcProduction(!switcProduction);
      // setClickedItemIndex(index);

      // Store the clicked index in localStorage
      // localStorage.setItem("clickedItemIndex", index.toString());
    }
  };

  const getPlaceholderImage = (name) => {
    const firstLetter = name ? name.charAt(0).toUpperCase() : "";
    const randomColor = getRandomColor(); // Function to generate a random color
    const textColor = "#ffffff"; // Text color for the first letter

    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="${randomColor}" style="border-radius: 50%;"><circle cx="50%" cy="50%" r="50%" fill="${randomColor}"/><text x="50%" y="50%" alignment-baseline="middle" text-anchor="middle" font-size="10" font-weight="bold" font-family="font-Segoe-UI" fill="${textColor}">${firstLetter}</text></svg>`;

    const encodedSVG = encodeURIComponent(svgString)
      .replace(/%2F/g, "/")
      .replace(/%22/g, "'")
      .replace(/%3D/g, "=")
      .replace(/%3A/g, ":")
      .replace(/%20/g, " ");

    return `data:image/svg+xml;utf8,${encodedSVG}`;
  };

  // Function to generate a random color
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

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
                href={
                  selectedProduction
                    ? `/productions/${selectedProduction?.ID}/dashboard`
                    : route.children
                    ? ""
                    : route.path
                }
              >
                <img
                  src={route.icon}
                  alt=""
                  width={14}
                  style={{ filter: "brightness(0)" }}
                />
                <p className={`route-name`}>{route?.name}</p>
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
          <div className="sidebar-list mx-2">
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
          </div>
        ) : (
          ""
        )}
      </div>
    );
  };

  const popover = (
    <Popover id="popover-contained" className="w-100 popover-side">
      <Popover.Body className="p-0">
        <div>
          {productionList ? (
            <>
              <div className="container cursor-pointer p-0">
                <div
                  className="d-flex align-items-center mt-2 flex-row"
                  onClick={() => {
                    setProductionList(false);
                    setSelectedProduction();
                    setClickedItemIndex(null);
                    setSearchText("");
                    clearProductionSelection();
                  }}
                >
                  <Image
                    src="/home.svg"
                    alt="project"
                    width="20"
                    height="24"
                    className="ms-2 cursor-pointer me-2"
                  />
                  <div className="d-flex align-items-start ms-2">
                    <div
                      id="clicked"
                      className="home cursor-pointer"
                      onClick={() => {
                        setProductionList(false);
                        setSelectedProduction();
                        setClickedItemIndex(null);
                        setSearchText("");
                        clearProductionSelection();
                        router.push("/dashboard");
                      }}
                    >
                      <div>Home</div>
                    </div>
                  </div>
                </div>
                <Input
                  onChange={(e) => setSearchText(e.target.value)}
                  type="search"
                  className="searchProduction1 mt-2 ms-1 cursor-pointer w-100 mx-0"
                  placeholder="Search Production"
                  style={{ height: "38px" }}
                />
                {productionData ? (
                  <>
                    {productionData?.map((item: any, index: any) => {
                      const isClicked = index === clickedItemIndex;
                      return (
                        <div
                          key={`${index}-productions`}
                          className={`d-flex mb-2 align-items-center cursor-pointer flex-row${
                            isClicked ? " clicked" : ""
                          }`}
                          onClick={() => handleItemClick(item, index)}
                        >
                          <img
                            className="rounded-circle cursor-pointer me-1 ms-2"
                            src={item.img || getPlaceholderImage(item.Name)}
                            width="22"
                            height="22"
                            alt="avatar"
                            key={index}
                          />
                          <div className="d-flex flex-column">
                            <div className="d-flex align-items-start">
                              <p
                                className={`home cursor-pointer mt-1 ms-2 ${
                                  item?.Name.length > 5 ? "ellipsis" : ""
                                }`}
                              >
                                {item.Name}
                              </p>
                            </div>
                            <div className="d-flex mb-1 mt-1 ms-2 cursor-pointer align-items-start">
                              <p className="ressl ellipsis">
                                {item.Client.Name
                                  ? item.Client.Name
                                  : item.Description}
                              </p>
                            </div>
                          </div>
                          {isClicked && (
                            <img
                              key={index}
                              className="me-2 cursor-pointer"
                              src="/tick.svg"
                              alt="tickmark"
                              width="16"
                              height="16"
                            />
                          )}
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <div className="d-flex align-items-center mb-2 justify-content-center">
                      <p className="ressl1">No productions found</p>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : null}
        </div>
      </Popover.Body>
    </Popover>
  );
  return (
    <div
      className={`d-flex flex-column sidebar align-items-between bd-highlight ${
        showSidebar ? "" : "minimized"
      }`}
    >
      <div className="bd-highlight">
        <div className="pb-2 px-2 d-flex gap-2 justify-content-between align-items-center">
          <div>
            {showSidebar ? (
              <img src="/logo.svg" width={100} height={38} alt="logo" />
            ) : (
              <img
                src="/icons/logo-dark.svg"
                width={25}
                height={38}
                alt="logo"
              />
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

        {!showSidebar ? (
          <div className="px-2 sidebar-body">
            <div className="d-flex gap-2 cursor-pointer justify-content-center">
              <Image
                src="/home-white.svg"
                alt="project"
                width="20"
                height="20"
                className="cursor-pointer"
                onClick={() => {
                  toggleSidebar();
                  handleDropDownChange(null);
                  setProductionList(true);
                }}
              />
            </div>
          </div>
        ) : (
          <div
            className="sidenavDropdown"
            onClick={() => {
              if (productionList) {
                // setProductionList(false);
                setSearchText("");
              } else {
                setProductionList(true);
              }
            }}
          >
            {!userData?.data?.IsStaffUser && productionData?.length === 1 ? (
              <>
                {productionData?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="d-flex align-items-center flex-row"
                    >
                      <Image
                        src="/home.svg"
                        alt="project"
                        width="30"
                        height="35"
                        className="ms-2 me-2"
                      />
                      <div className="d-flex flex-column cursor-pointer">
                        <div className="d-flex align-items-start">
                          <p className="home mt-1 cursor-pointer">
                            {item?.Name}
                          </p>
                        </div>
                        <div className="d-flex mb-1 align-items-start">
                          <p className="ressl cursor-pointer">
                            {item.Client.Name
                              ? item.Client.Name
                              : item.Description}
                          </p>
                        </div>
                      </div>
                      <Image
                        src="/chevron-down.svg"
                        alt="project"
                        width="20"
                        height="24"
                        className="ms-auto cursor-pointer me-3"
                      />
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <OverlayTrigger
                  rootClose
                  trigger="click"
                  placement="bottom"
                  overlay={popover}
                  transition
                >
                  {selectedProduction ? (
                    <div
                      className="d-flex align-items-center cursor-pointer flex-row"
                      onClick={() => {
                        setSearchText("");
                        // clearProductionSelection();
                      }}
                    >
                      <div className="d-flex align-items-center justify-content-center">
                        <Image
                          src="/home.svg"
                          alt="project"
                          width="30"
                          height="35"
                          className="ms-2 me-2 cursor-pointer"
                        />
                        <div className="text-container text-center">
                          <div className="d-flex align-items-start">
                            <p className="home mt-1 cursor-pointer ellipsis">
                              {selectedProduction?.Name}
                            </p>
                          </div>
                          <div className="d-flex mt-1 mb-1 align-items-start">
                            <p className="ressl cursor-pointer">
                              {selectedProduction?.Client?.Name
                                ? selectedProduction?.Client?.Name
                                : selectedProduction?.Description}
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
                    </div>
                  ) : (
                    showSidebar && (
                      <div className="d-flex align-items-center flex-row">
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
                          {userData?.data?.IsStaffUser ? (
                            <div className="d-flex mb-1 align-items-start">
                              <p className="ressl cursor-pointer">
                                Resilient Software Solutions
                              </p>
                            </div>
                          ) : (
                            <div className="d-flex mb-1 align-items-start">
                              <p className="ressl cursor-pointer">
                                {userData?.data?.Client?.Name}
                              </p>
                            </div>
                          )}
                        </div>
                        <Image
                          src="/chevron-down.svg"
                          alt="project"
                          width="20"
                          height="24"
                          className="ms-auto cursor-pointer me-3"
                        />
                      </div>
                    )
                  )}
                </OverlayTrigger>
              </>
            )}
          </div>
        )}
      </div>

      {!userData?.data?.IsStaffUser && productionData?.length === 1 ? (
        <>
          <div className="px-2 mt-2 sidebar-body">
            {sidebarRoutesProduction
              .filter((route: any) => {
                const isSuperAdminWithFullAccess =
                  userData?.data?.Role?.Code === "SUPER_ADMIN" &&
                  userData?.data?.Role?.AccessType === "full_acceess";

                const filterByName =
                  route.name === "Dashboard" ||
                  (hasViewConfiguration && route?.name === "Configurations") ||
                  (hasViewTranscations && route?.name === "Transactions") ||
                  (hasViewPayments && route?.name === "Payments");

                // Include the route only if filterByName is true
                return isSuperAdminWithFullAccess || filterByName;
              })
              .map((route: any, i) => (
                <SideBarRoute route={route} key={`sidebar-route-${i}`} />
              ))}
          </div>
        </>
      ) : (
        <div className="bd-highlight ms-1">
          {userData?.data?.IsStaffUser ? (
            selectedProduction ? (
              <div className="px-2 mt-2 sidebar-body">
                {sidebarRoutesProduction
                  .filter((route: any) => {
                    const isSuperAdminWithFullAccess =
                      userData?.data?.Role?.Code === "SUPER_ADMIN" &&
                      userData?.data?.Role?.AccessType === "full_acceess";

                    const filterByName =
                      route.name === "Dashboard" ||
                      (hasViewConfiguration &&
                        route?.name === "Configurations") ||
                      (hasViewTranscations && route?.name === "Transactions") ||
                      (hasViewPayments && route?.name === "Payments");

                    // Include the route only if filterByName is true
                    return isSuperAdminWithFullAccess || filterByName;
                  })
                  .map((route: any, i) => (
                    <SideBarRoute route={route} key={`sidebar-route-${i}`} />
                  ))}
              </div>
            ) : (
              <div className="px-2 mt-2 sidebar-body">
                {sidebarRoutesMaster
                  .filter((route) => {
                    const isSuperAdminWithFullAccess =
                      userData?.data?.Role?.Code === "SUPER_ADMIN" &&
                      userData?.data?.Role?.AccessType === "full_acceess";

                    const filterRoute =
                      route.name === "Dashboard" ||
                      (route.name === "Configurations" &&
                        hasViewConfiguration) ||
                      (route.name === "Reports" && hasViewReports) ||
                      (route.name === "Productions" && hasViewProduction) ||
                      (route.name === "Clients" && hasViewClients) ||
                      (route.name === "Settings" &&
                        ((hasViewUsers &&
                          route.children?.some(
                            (child) => child.name === "User Management"
                          )) ||
                          (hasViewRoles &&
                            route.children?.some(
                              (child) => child.name === "Role Management"
                            ))));

                    return isSuperAdminWithFullAccess || filterRoute;
                  })

                  .map((route: any, i) => (
                    <SideBarRoute route={route} key={`sidebar-route-${i}`} />
                  ))}
              </div>
            )
          ) : selectedProduction ? (
            <div className="px-2 mt-2 sidebar-body">
              {sidebarRoutesProduction
                .filter((route: any) => {
                  const filterByName =
                    route.name === "Dashboard" ||
                    (hasViewConfiguration &&
                      route?.name === "Configurations") ||
                    (hasViewTranscations && route?.name === "Transactions") ||
                    (hasViewPayments && route?.name === "Payments");

                  // Include the route only if filterByName is true
                  return filterByName;
                })
                .map((route: any, i) => (
                  <SideBarRoute route={route} key={`sidebar-route-${i}`} />
                ))}
            </div>
          ) : (
            <div className="px-3 mt-2 sidebar-body">
              {sidebarRoutesNonStaff
                .filter((route: any) => {
                  const filterByName =
                    route.name === "Dashboard" ||
                    (hasViewConfiguration &&
                      route?.name === "Configurations") ||
                    (hasViewProduction && route?.name === "Productions") ||
                    (hasViewReports && route?.name === "Reports") ||
                    (route.name === "Settings" &&
                      hasViewUsers &&
                      route.children?.some(
                        (child) => child.name === "User Management"
                      ));
                  // Include the route only if filterByName is true
                  return filterByName;
                })
                .map((route: any, i) => (
                  <SideBarRoute route={route} key={`sidebar-route-${i}`} />
                ))}
            </div>
          )}
        </div>
      )}

      {/* Bottom Bar */}
      <div className="bottom-bar mb-2 ms-1 mt-auto bd-highlight">
        <hr />
        {/* Help Button */}
        <div className="d-flex py-2 align-items-center my-1 select-btn">
          <img
            src="/icons/help.svg"
            width={14}
            className={showSidebar ? "me-2" : "mx-auto"}
            alt=""
          />
          <p className={showSidebar ? "" : "d-none"}>Need Help ? </p>
          <img
            src="/icons/more_horiz.svg"
            alt="more"
            className={showSidebar ? "ms-auto cursor-pointer" : "d-none"}
          />
        </div>
        {/* Profile Button */}
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
                    onClick={() => document.body.click()}
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
          <div className="d-flex py-2 align-items-center my-1 select-btn cursor-pointer">
            <img
              className={
                showSidebar ? "rounded-circle me-3" : "rounded-circle mx-auto"
              }
              src={userData?.data?.profile_image || "/default.svg"}
              width="32"
              height="32"
            />
            <p className={showSidebar ? "f-ellipsis" : "d-none"}>
              {userData?.data?.first_name || ""}&nbsp;
              {userData?.data?.last_name || ""}
            </p>
            <img
              src="/icons/more_horiz.svg"
              alt="more"
              className={showSidebar ? "ms-auto" : "d-none"}
            />
          </div>
        </OverlayTrigger>
      </div>

      <Modal
        show={switcProduction}
        onHide={() => {
          setSwitcProduction(!switcProduction);
        }}
        // show={show}
        // onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        // dialogClassName="modal-40w"
      >
        <Modal.Header className="border-0 d-flex justify-content-center align-items-center mt-4 pt-2 pb-0 ps-4">
          <Modal.Title className="mb-0 fw-bold">Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mb-0 mt-0 pb-0 pt-4 d-flex justify-content-center align-items-center">
          <div className="d-flex flex-column">
            <p className="d-flex justify-content-center mb-0 align-items-center">
              Do you want to switch production!!
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0 mt-4 mb-4 pb-0 d-flex justify-content-center align-items-center">
          <button
            className="btn ms-3 bg-white"
            onClick={() => {
              setSwitcProduction(!switcProduction);
              setTemp1("");
              setTemp2("");
            }}
          >
            Cancel
          </button>

          <Button
            className="text-white"
            onClick={() => {
              setProductionList(false);
              setClickedItemIndex(temp2);
              setSelectedProduction(temp1);
              handleProductionSelection(temp1);
              localStorage.setItem("clientid", temp1?.Client?.ID);
              localStorage.setItem("projectid", temp1?.ID);
              router.push(`/productions/${temp1.ID}/dashboard`);
              setSwitcProduction(!switcProduction);
            }}
            style={{ width: 150 }}
          >
            Yes, Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Sidebar;
