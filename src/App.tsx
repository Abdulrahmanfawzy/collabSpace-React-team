

// const App = () => {
//   return<>
//   <div className="text-center text-support-pink">App</div>
 
//   </> 
// };

// export default App;


import { ProjectProgressCard } from "@/features/projects/components/project-progress-card"
import { projectProgressMock } from "@/features/projects/data/projects.mock"

export default function App() {
  return (
    <div className="w-96 bg-secondary-gray-50/40 p-6">
      <ProjectProgressCard progress={projectProgressMock} />
    </div>
  )
}