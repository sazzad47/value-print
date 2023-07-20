import React from "react";

const Map = () => {
  return (
    <div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d65352248.53894911!2d30.07571610000002!3d1.304219799999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da3d4ec5f16a61%3A0x7135de8aca097f2c!2sValue%20Printing%20Pte%20Ltd%20-%20Printing%20Service%20in%20Singapore!5e0!3m2!1sen!2sbd!4v1689617304557!5m2!1sen!2sbd"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Maps"
      ></iframe>
    </div>
  );
};

export default Map;
