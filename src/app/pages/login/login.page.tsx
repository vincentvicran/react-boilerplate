import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
export const Login = () => {
  return (
    <div className="login-page">
      <Helmet>
        <script type="text/javascript">
          {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "jb3ltwk15a");
            `}
        </script>
      </Helmet>
      <Link to="/table">
        <div className="login-nav">Go to Table Page</div>
      </Link>
    </div>
  )
}
