import { Helmet } from 'react-helmet'

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

      <div className="login-nav">Login Page H</div>
    </div>
  )
}
