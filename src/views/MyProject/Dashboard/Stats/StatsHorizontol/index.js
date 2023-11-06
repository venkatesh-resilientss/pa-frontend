import PropTypes from "prop-types";
import classnames from "classnames";
import { Card, CardBody } from "reactstrap";
import { Info } from "react-feather";

const StatsHorizontal = ({
  icon,
  color,
  stats,
  renderStats,
  statTitle,
  className,
  statsMargin,
}) => {
  return (
    <Card className={`text-${color}`}>
      <CardBody
        className={classnames(
          "d-flex justify-content-between align-items-center",
          className
        )}
      >
        <div className="d-flex justify-content-between col-12">
          <div>
            {" "}
            <div className="d-flex  align-items-center" style={{ gap: "5px" }}>
              <div className="d-flex align-items-center">{icon}</div>
              <div className="card-text m-auto" style={{ fontSize: "10px" }}>
                {statTitle}
              </div>
            </div>
            {renderStats ? (
              renderStats
            ) : (
              <h1
                className={classnames("fw-bolder", {
                  "mb-0": !statsMargin,
                  [statsMargin]: statsMargin,
                })}
              >
                {stats}
              </h1>
            )}
          </div>

          <div className="d-flex align-items-center mb-3">
            <Info size={14} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

StatsHorizontal.propTypes = {
  stats: PropTypes.string,
  renderStats: PropTypes.any,
  className: PropTypes.string,
  icon: PropTypes.element.isRequired,
  color: PropTypes.string.isRequired,
  statTitle: PropTypes.string.isRequired,
  statsMargin: PropTypes.oneOf([
    "mb-0",
    "mb-25",
    "mb-50",
    "mb-75",
    "mb-1",
    "mb-2",
    "mb-3",
    "mb-4",
    "mb-5",
  ]),
};

export default StatsHorizontal;
