import { PointChart } from "./Components/Dashboard/chart.projet.js";
import { PieChart } from "./Components/Dashboard/chart.ratio.js";
import { CustomDash } from "./Components/Dashboard/dashboard.js";
import { customLogout } from "./Components/Dashboard/logout.js";
import { CustomUser } from "./Components/Dashboard/user.info.js";
import { CustomLogin } from "./Components/login.js";
import { start } from "./Services/session.js";

customElements.define('custom-login', CustomLogin); 
customElements.define('custom-dashboard', CustomDash);
customElements.define('custom-user-info', CustomUser);
customElements.define('pie-chart', PieChart);
customElements.define('point-chart', PointChart)
customElements.define('custom-logout', customLogout)

start();
