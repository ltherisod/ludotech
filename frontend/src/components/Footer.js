const Footer = () => {
   return (
      <footer
         className="footerContainer"
         style={{
            backgroundImage: `url("https://i.postimg.cc/90sJmPWq/footer.png")`,
         }}
      >
         
         <img
            className="logoFooter"
            src="https://i.postimg.cc/sfqQZZsH/logo-Mindhub.png"
            alt="logoM"
         />
         <div className="socialMediaContainer">
            <a
               href="https://www.instagram.com"
               target="_blank"
               rel="noopener noreferrer"
            >
               <img
                  alt="instagram"
                  src="/assets/instagram.png"
                  className="footerInsta"
               />
            </a>
            <a
               href="https://www.facebook.com"
               target="_blank"
               rel="noopener noreferrer"
            >
               <img
                  alt="instagram"
                  src="/assets/facebook.png"
                  className="footerFace"
               />
            </a>
            <a
               href="https://www.twitter.com"
               target="_blank"
               rel="noopener noreferrer"
            >
               <img
                  alt="instagram"
                  src="/assets/twitter.png"
                  className="footerTwit"
               />
            </a>
         </div>
         <p className="footerRights">LudoTech © All rights reserved 2021</p>
      </footer>
   )
}

export default Footer
