import stamp from "../assets/EduTrackr-Stamp.png";
import "../css/Certificate.css";
import { useParams } from "react-router-dom";
import { PageLoader } from "../Componenets/Loaders";
import { useEffect, useState } from "react";

const Certificate = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const { id } = useParams()
  const currentDate = new Date().toLocaleDateString();

  useEffect(() => {
        const timer = setTimeout(() => {
          setInitialLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
      }, []);
    
      if (initialLoading) {
        return <PageLoader />;
      }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="certificate-container">
      <div className="certificate-box">
        <div className="certificate-border">
          <div className="certificate-header">
            <div className="logo">
              <span className="logo-e">E</span>duTrackr
            </div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2583/2583343.png"
              alt="Gold Badge"
              className="cert-badge"
            />
          </div>

          <h2 className="cert-heading">Certificate of Completion</h2>
          <p className="cert-sub">This is to proudly certify that</p>
          <h3 className="cert-user">Bejide Mofiyinfoluwa Israel</h3>
          <p className="cert-sub">has successfully completed the course</p>
          <h4 className="cert-course">Mathematics for Beginners</h4>

          <div className="cert-footer">
            <p className="cert-date">Awarded on: {currentDate}</p>

            <div className="cert-signatures">
              <div className="signature-block">
                <div className="line"></div>
                <p>Instructor's Signature</p>
              </div>
              <div className="signature-block">
                <img src={stamp} alt="EduTrackr Seal" className="seal-image" />
                <div className="line"></div>
                <p>EduTrackr Seal</p>
              </div>
            </div>
          </div>

          <div className="cert-note">
            <p>
              This certificate is awarded in recognition of the successful
              completion of the course and demonstrates the learner's
              commitment to personal and professional development.
            </p>
            <button onClick={handlePrint} className="print-btn">
              Download / Print Certificate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
