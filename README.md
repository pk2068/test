Clone the git code  
run the npm install
run npm start

When the page renders, use the top left toggle button for using the templates or not.

Try to switch data between DataA and DataB button. 

Essential part when changing data source of the GridComponent that use data as a state, is to clear data first and then after specific amount of time, set the data state again.

   const toDataA = (e) => {
          setData([]);
          setTimeout(()=> {
               setData(dataA);        

          }, 300);
          
     }

     const toDataB = (e) => {
          setData([]);
          setTimeout(()=> {
               setData(dataB);        

          }, 300);
          
     }

     If toDataA function would be simply calling 
     const toDataB = (e) => { setData(A); }

     then this would result in crashing of GridComponent.
     UNLESS, you are not using any templates in CollumnDirective.
