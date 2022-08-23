/* eslint-disable no-sequences */
import Style from "./Card.module.css";
import Image from "../Image/Image";
import Chart from "../Chart/Chart";
import PropTypes from 'prop-types';

function numberWithCommas(value) {
  if (!value) value = 0;
  return parseFloat(value).toLocaleString("en-US", {
    maximumFractionDigits: 2,
  });
}

function Card(data) {
  const dataRevenue = data.logs
    .map((e) => e.revenue)
    .reduce((a, b) => a + b, 0);

  const dataMoreValues = data.logs.reduce(
    (r, o) => (
      r[o.type]
        ? r[o.type].total
          ? r[o.type].total++
          : (r[o.type].total = 1)
        : (r[o.type] = { ...o }),
      r
    ),
    {}
  );

  return (
    <div className={Style.card}>
      <div className={Style.figure}>
        <div className={Style.img}>
          <Image src={data.avatar} alt={data.name} />
        </div>

        <div className={Style.details}>
          <p>{data.name}</p>
          <span>{data.occupation}</span>
        </div>
      </div>

      <div className={Style.counts}>
        <div className={Style.chart}>
          <Chart logs={data.logs} />
        </div>
        <div className={Style.number}>
          <p>
            <b>{numberWithCommas(dataMoreValues.impression.total)}</b>
            Impressions
          </p>
          <p>
            <b>{numberWithCommas(dataMoreValues.conversion.total)}</b>
            Conversion
          </p>
          <p>
            <b>${numberWithCommas(dataRevenue)}</b>
          </p>
        </div>
      </div>
    </div>
  );
}

Card.prototype = {
  data: PropTypes.object
}

export default Card;
