import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Start_Page from '../start/Start_Page';
import Work_Page from '../work/Work_Page';

const container = document.getElementById('root');
const root = createRoot(container);

const start_page = (<Start_Page />);
const work_page = (<Work_Page />);

const router = (
          <Router>
              <Routes>
                <Route path="/" element={start_page} />
                <Route path="/start" element={start_page} />
                <Route path="/work" element={work_page} />
                <Route path="*" element={start_page} />
              </Routes>
          </Router>
);

// const router = (
//   <Router>
//       <Routes>
//         <Route path="/" element={work_page} />
//         <Route path="/start" element={start_page} />
//         <Route path="/work" element={work_page} />
//         <Route path="*" element={work_page} />
//       </Routes>
//   </Router>
// );



root.render(router);