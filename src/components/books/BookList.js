import React from 'react'
export const BookList = () => {
    return(
        <div>
            
            <h1>Book 1</h1>
            <h1>Book 2</h1>
            <h1>Book 3</h1>
        </div>
        
    )
}
// const FullRoster = () => (
//     <div>
//       <ul>
//         {
//           PlayerAPI.all().map(p => (
//             <li key={p.number}>
//               <Link to={`/roster/${p.number}`}>{p.name}</Link>
//             </li>
//           ))
//         }
//       </ul>
//     </div>
//   )