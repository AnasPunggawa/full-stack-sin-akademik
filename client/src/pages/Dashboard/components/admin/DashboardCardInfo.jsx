import PropTypes from 'prop-types';

function DashboardCardInfo({ CardContent }) {
  return (
    <div
      className={`${CardContent.bgColor} text-white rounded-md p-3 flex justify-between gap-1.5`}
    >
      <div className="flex flex-col justify-between">
        <h3 className="text-base font-medium">{CardContent.title}</h3>
        <h5 className="text-xl font-bold">{CardContent.value}</h5>
      </div>
      {CardContent.Icon}
    </div>
  );
}

DashboardCardInfo.propTypes = {
  CardContent: PropTypes.object,
};

export default DashboardCardInfo;
