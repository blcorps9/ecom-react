import React from "react";
import cx from "classnames";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { addToFav, removeFromFav } from "../../store/actions/user";

function FavoriteIcon(props) {
  const { item, isFavorite } = props;

  const toggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite) {
      props.removeFromFav(item.id);
    } else {
      const { id, color, size } = item;
      const payload = { id };

      if (color) payload.color = color;
      if (size) payload.size = size;

      props.addToFav(payload);
    }
  };

  return (
    <div
      onClick={toggle}
      className={cx("fav-icon-container", { "is-fav": isFavorite })}
    >
      <FontAwesomeIcon
        size="2x"
        icon={{ prefix: isFavorite ? "fas" : "far", iconName: "heart" }}
      />
    </div>
  );
}

export default connect(null, { addToFav, removeFromFav })(FavoriteIcon);
