import { useState } from "react";
import { IoShieldCheckmarkSharp } from "react-icons/io5";

import "./style.scss";

const CreditCard = () => {
  const [active, setActive] = useState(true);

  return (
    <div className="box-card">
      <div
        onClick={() => setActive(!active)}
        className="cards">
        {active ? <div className="front"></div> : <div className="back"></div>}
      </div>
      <div className="security">
        <IoShieldCheckmarkSharp />
        <p>Seus dados estão seguros</p>
      </div>
    </div>
  );
};

export default CreditCard;
