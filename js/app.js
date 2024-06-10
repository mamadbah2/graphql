import { PointChart } from "./Components/Dashboard/chart.projet.js";
import { PieChart } from "./Components/Dashboard/chart.ratio.js";
import { CustomDash } from "./Components/Dashboard/dashboard.js";
import { customLogout } from "./Components/Dashboard/logout.js";
import { CustomUser } from "./Components/Dashboard/user.info.js";
import { CustomLogin } from "./Components/Connexion/login.js";
import { start } from "./Services/session.js";
import { StickChart } from "./Components/Dashboard/chart.skills.js";
import { CustomLevel, CustomXP } from "./Components/Dashboard/level.xp.js";

customElements.define('custom-login', CustomLogin); 
customElements.define('custom-dashboard', CustomDash);
customElements.define('custom-user-info', CustomUser);
customElements.define('pie-chart', PieChart);
customElements.define('point-chart', PointChart);
customElements.define('stick-chart', StickChart);
customElements.define('custom-level', CustomLevel);
customElements.define('custom-xp', CustomXP);
customElements.define('custom-logout', customLogout);

document.addEventListener('DOMContentLoaded', start);
