import React from "react";

type Props = {
  className?: string;
};

function Footer(props: Props) {
  return (
    <footer>
      <p className={props.className}>© Copyrights belongs to Shamil</p>
    </footer>
  );
}

export default Footer;
