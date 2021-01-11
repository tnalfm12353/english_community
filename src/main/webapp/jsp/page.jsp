<%@ page language="java" contentType="text/html; charset=utf-8"
%>
<!doctype html>
<html>
    <link href="https://fonts.googleapis.com/css2?family=Kalam&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap" rel="stylesheet">
    <meta name="_csrf" content="${_csrf.token}"/>
    <!-- default header name is X-CSRF-TOKEN -->
    <meta name="_csrf_header" content="${_csrf.headerName}"/>
    <meta name="viewport" content="width=device-width, height= device-height, initial-scale=1.0">
    <style>
            html,body {margin: 0; padding: 0; border: 0; width:100%; height: 100%;}
            /* width */
            ::-webkit-scrollbar {
            width: 4px;
        
            }

            #root{
                width: 100%;
                height: 100%;
            }

            /* Track */
            ::-webkit-scrollbar-track {
                background: rgba(255,255,255,0.1);
                backdrop-filter: saturate(180%) blur(3px);
            }
            
            /* Handle */
            ::-webkit-scrollbar-thumb {
                background: rgba(0,0,0,0.3);
                backdrop-filter: saturate(180%) blur(3px);
            }

            /* Handle on hover */
            ::-webkit-scrollbar-thumb:hover {
                background: #555; 
            }
    </style>
    <head> 
        <link rel="icon" type="image/jpg" href="../img/BUFS_symbol.jpg"/>
        <title>BUFS English Community</title>
    </head>
    <body>
        <div id="root"></div>
        <!-- <script src="/js/react/lifeCycle.bundle.js"></script>  -->
        <script src="/js/react/main.bundle.js"></script>
    </body>
</html>