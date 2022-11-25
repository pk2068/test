import { React, useEffect, useRef, useState } from "react";
import './App.css';
import dataA from './dataSource.json';
import dataB from './dataSource2.json';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-grids";
import {
     ContextMenu, Filter, GridComponent, InfiniteScroll, Inject, Resize, Sort, VirtualScroll
} from '@syncfusion/ej2-react-grids';

import { DefaultButton } from "@fluentui/react";
import { registerLicense } from '@syncfusion/ej2-base';


registerLicense('ORg4AjUWIQA/Gnt2VVhjQlFac11JXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0VgWH9ac3JVQWNVWEQ=');

function App() {

     const [data, setData] = useState([]);
     const gridInstanceRef = useRef();
     const gridInstanceRef2 = useRef();
     const divHeaderRef = useRef();
     const divFooterRef = useRef();
     const divBoxRef = useRef();

     const refContainer = useRef();
     const [dimensions, setDimensions] = useState({ height: 0 });
     const [gridDimensions, setGridDimensions] = useState({ height: 200 });

     const [useTemplate, setUseTemplate] = useState(true);

     useEffect(() => {


          if (refContainer.current) {
               setDimensions({
                    width: refContainer.current.offsetWidth,
                    height: refContainer.current.offsetHeight,
               });

               console.log("refContainer.current.offsetHeight", refContainer.current.offsetHeight, refContainer.current, refContainer.current.offsetHeight);
               console.log("divBoxRef.current.offsetHeight", divBoxRef.current.offsetHeight);
               console.log("divHeaderRef.current.offsetHeight", divHeaderRef.current.offsetHeight);
               console.log("divFooterRef.current.offsetHeight", divFooterRef.current.offsetHeight);

               if (gridInstanceRef.current) {

                    console.log("gridInstanceRef.current.height", gridInstanceRef.current.height);

                    let newHeight = refContainer.current.offsetHeight - divHeaderRef.current.offsetHeight - divFooterRef.current.offsetHeight - 50;
                    setGridDimensions({ height: newHeight });
                    console.info("%c GridComponent Height", 'background:green, color:pink', newHeight);
               }
          }
     }, []);

     const toDataA = (e) => {
          setData([]);
          setTimeout(()=> {
               setData(dataA);
          // if (gridInstanceRef.current)
          // gridInstanceRef.current.refresh();
          // if (gridInstanceRef2.current)
          // gridInstanceRef2.current.refresh();

          }, 300);
          
     }

     const toDataB = (e) => {
          setData([]);
          setTimeout(()=> {
               setData(dataB);
          // if (gridInstanceRef.current)
          // gridInstanceRef.current.refresh();
          // if (gridInstanceRef2.current)
          // gridInstanceRef2.current.refresh();
          },300);
     }

     const emptyData = (e) => {
          setData([]);
          //gridInstanceRef.current.refresh();
     }

     const incrementUserIDs = () => {
          data.forEach(element => { element.userId += 1; });
     }

     function changeUserIDData() {

          for (let i = 0; i < 5; i++) {
               console.log("For loop iteration: ", i);
               setTimeout(() => {
                    incrementUserIDs();
                    console.log("refreshing :", i);
                    gridInstanceRef.current.refresh();
               }, 2500);

          }
     }

     const changeLicenseData = (e) => {
          if (data.length === dataA.length)
               setData(dataB)
          else
               setData(dataA);
     }

     const OnTemplateHandler = (e) => {
          setUseTemplate(s => s = !s)
     }


     //#region SyncFS GridComponent settings
     const settings = { type: 'Multiple', mode: 'Both' };
     const filterOptions = {
          mode: 'Immediate',
          ignoreAccent: true,
          showFilterBarOperator: true,
          type: 'Menu'
     }

     const contextMenuItems = [
          { text: 'Open Config', id: 'openconfig1', target: '.e-content' },
          { text: 'Open Config as Admin', id: 'openconfig2', target: '.e-content' },
          { text: 'Open Config as Admin filtered', id: 'openconfig3', target: '.e-content' }
     ];
     const contextmenuClick = async (ev) => { }

     const TemplateCreatedOnMonth = (prop) => {
          let returnVal = "*";

          if (!prop)
               return (<span></span>);
          if (!prop.createdonMonth)
               return (<span></span>);

          switch (prop.createdonMonth) {
               case 12:
                    returnVal = "DEC";
                    break;
               case 11:
                    returnVal = "NOV";
                    break;
               case 10:
                    returnVal = "OCT";
                    break;
               case 9:
                    returnVal = "SEP";
                    break;
               case 8:
                    returnVal = "AVG";
                    break;
               case 7:
                    returnVal = "JUL";
                    break;
               case 6:
                    returnVal = "JUN";
                    break;
               case 5:
                    returnVal = "MAI";
                    break;
               case 4:
                    returnVal = "APR";
                    break;
               case 3:
                    returnVal = "MAR";
                    break;
               case 2:
                    returnVal = "FEB"
                    break;
               case 1:
                    returnVal = "Jan";
                    break;

               default:
                    returnVal = "-";
          }

          return (<span>{returnVal}</span>);


     }

     //#endregion

     return (

          <div className="App" ref={refContainer} >



               <div className="box" ref={divBoxRef}>
                    <div className="row header" ref={divHeaderRef}>
                         <p><b>header</b></p>

                         <DefaultButton text={"Data A"} onClick={toDataA} />
                         <DefaultButton text={"Data B"} onClick={toDataB} />
                         <DefaultButton text={"Empty Data"} onClick={emptyData} />
                         <DefaultButton text={"Increase UserID count"} onClick={changeUserIDData} />
                         <DefaultButton text={"Increase License count"} onClick={changeLicenseData} />
                         <Toggle label="Templates" inlineLabel onText="On" offText="Off" checked={useTemplate} onChange={OnTemplateHandler} />
                         <p>div ALL : h-{dimensions.height}px // gridComponent: h-{gridDimensions.height}px</p>
                         <p>header: h-{divHeaderRef.current ? divHeaderRef.current.offsetHeight : -1}px </p>
                         <p>footer: h-{divFooterRef.current ? divFooterRef.current.offsetHeight : -1}px </p>
                         
                    </div>

                    {/* template={TemplateCreatedOnMonth} */}

                    <div className="row content" >
                         {useTemplate ?

                              <GridComponent
                                   dataSource={data}
                                   dataBound={(e) => console.log("dataBound triggered", e)}
                                   dataSourceChanged={(e) => console.log("dataSourceChanged triggered", e)}
                                   dataStateChange={(e) => console.log("dataStateChange triggered", e)}


                                   ref={gridInstanceRef}
                                   enableInfiniteScrolling={true}
                                   enableVirtualization={false}
                                   enableHeaderFocus={false}
                                   enableSearch={false}
                                   height={gridDimensions.height}
                                   rowHeight={36}
                                   allowSelection={true}
                                   allowFiltering={true}
                                   filterSettings={filterOptions}
                                   allowPaging={false}
                                   allowResizing={true}
                                   allowReordering={true}
                                   allowSorting={true}
                                   allowGrouping={false}
                                   delayUpdate={true}
                                   selectionSettings={settings}
                                   rowSelected={(e) => { }}
                                   contextMenuItems={contextMenuItems}
                                   contextMenuClick={contextmenuClick}
                              >
                                   <ColumnsDirective>
                                        <ColumnDirective field='id' headerText='ID' textAlign='Left' width={70} isPrimaryKey={true} />
                                        <ColumnDirective field='userName' headerText='User' textAlign='Left' clipMode='EllipsisWithTooltip' />
                                        <ColumnDirective field='userId' headerText='User ID' textAlign='Left' width={40} clipMode='EllipsisWithTooltip' />
                                        <ColumnDirective field='userIdCount' headerText='User Count' textAlign='Left' width={40} clipMode='EllipsisWithTooltip' />
                                        <ColumnDirective field='serviceName' headerText='Service Name' textAlign='Left' width={100} clipMode='EllipsisWithTooltip' />

                                        <ColumnDirective field='disabled' textAlign='Left' width={40} clipMode='EllipsisWithTooltip' />
                                        <ColumnDirective field='createdonDay' textAlign='Left' width={60} clipMode='EllipsisWithTooltip' />
                                        <ColumnDirective field='createdonDayWeek' textAlign='Left' width={60} clipMode='EllipsisWithTooltip' />
                                        <ColumnDirective field='createdonDayYear' textAlign='Left' width={60} clipMode='EllipsisWithTooltip' />

                                        <ColumnDirective field='createdonMonth' textAlign='Left' width={80} clipMode='EllipsisWithTooltip' template={TemplateCreatedOnMonth} />

                                        <ColumnDirective field='createdonYear' textAlign='Left' width={50} clipMode='EllipsisWithTooltip' />
                                        <ColumnDirective field='organizationName' headerText='Org' textAlign='Left' width={100} clipMode='EllipsisWithTooltip' />
                                        <ColumnDirective field='discoveryWebServiceUrl' headerText='Disco' textAlign='Left' width={140} clipMode='EllipsisWithTooltip' />

                                        <ColumnDirective field='instanceId' textAlign='Left' width={40} clipMode='EllipsisWithTooltip' />
                                        <ColumnDirective field='instanceName' textAlign='Left' width={80} clipMode='EllipsisWithTooltip' />
                                        <ColumnDirective field='instanceUrl' textAlign='Left' width={140} clipMode='EllipsisWithTooltip' />
                                        <ColumnDirective field='ServiceStatusDescription' headerText='Status' textAlign='Left' width={100} clipMode='EllipsisWithTooltip' />

                                        <ColumnDirective field='ServiceStopDate' textAlign='Left' width={80} clipMode='EllipsisWithTooltip' />
                                        <ColumnDirective field='inactiveSince' textAlign='Left' width={80} clipMode='EllipsisWithTooltip' />
                                        <ColumnDirective field='sendChanges' textAlign='Left' width={60} clipMode='EllipsisWithTooltip' />
                                        <ColumnDirective field='productId' textAlign='Left' width={40} clipMode='EllipsisWithTooltip' />


                                   </ColumnsDirective>

                                   <Inject services={[Filter, Sort, VirtualScroll, Resize, InfiniteScroll, ContextMenu]} />
                              </GridComponent>

                              :
                              <GridComponent
                                   dataSource={data}
                                   dataBound={(e) => console.log("dataBound triggered", e)}
                                   dataSourceChanged={(e) => console.log("dataSourceChanged triggered", e)}
                                   dataStateChange={(e) => console.log("dataStateChange triggered", e)}
                                   ref={gridInstanceRef2}
                                   enableInfiniteScrolling={true}
                                   enableVirtualization={false}
                                   enableHeaderFocus={false}
                                   enableSearch={false}
                                   height={gridDimensions.height}
                                   rowHeight={36}
                                   allowSelection={true}
                                   allowFiltering={true}
                                   filterSettings={filterOptions}
                                   allowPaging={false}
                                   allowResizing={true}
                                   allowReordering={true}
                                   allowSorting={true}
                                   allowGrouping={false}
                                   delayUpdate={true}
                                   selectionSettings={settings}
                                   rowSelected={(e) => { }}
                                   contextMenuItems={contextMenuItems}
                                   contextMenuClick={contextmenuClick}
                              >
                                   <ColumnsDirective>
                                        <ColumnDirective field='id' headerText='ID' textAlign='Left' width={70} isPrimaryKey={true} />
                                        <ColumnDirective field='userName' headerText='User' textAlign='Left' clipMode='EllipsisWithTooltip' />
                                        <ColumnDirective field='userId' headerText='User ID' textAlign='Left' width={40} clipMode='EllipsisWithTooltip' />
                                        <ColumnDirective field='userIdCount' headerText='User Count' textAlign='Left' width={40} clipMode='EllipsisWithTooltip' />
                                        <ColumnDirective field='serviceName' headerText='Service Name' textAlign='Left' width={100} clipMode='EllipsisWithTooltip' />

                                        <ColumnDirective field='disabled' textAlign='Left' width={40} clipMode='EllipsisWithTooltip' />
                                        <ColumnDirective field='createdonDay' textAlign='Left' width={60} clipMode='EllipsisWithTooltip' />
                                        <ColumnDirective field='createdonDayWeek' textAlign='Left' width={60} clipMode='EllipsisWithTooltip' />
                                        <ColumnDirective field='createdonDayYear' textAlign='Left' width={60} clipMode='EllipsisWithTooltip' />


                                        <ColumnDirective field='createdonMonth' textAlign='Left' width={80} clipMode='EllipsisWithTooltip' />

                                        <ColumnDirective field='createdonYear' textAlign='Left' width={50} clipMode='EllipsisWithTooltip' />
                                        <ColumnDirective field='organizationName' headerText='Org' textAlign='Left' width={100} clipMode='EllipsisWithTooltip' />
                                        <ColumnDirective field='discoveryWebServiceUrl' headerText='Disco' textAlign='Left' width={140} clipMode='EllipsisWithTooltip' />

                                        <ColumnDirective field='instanceId' textAlign='Left' width={40} clipMode='EllipsisWithTooltip' />
                                        <ColumnDirective field='instanceName' textAlign='Left' width={80} clipMode='EllipsisWithTooltip' />
                                        <ColumnDirective field='instanceUrl' textAlign='Left' width={140} clipMode='EllipsisWithTooltip' />
                                        <ColumnDirective field='ServiceStatusDescription' headerText='Status' textAlign='Left' width={100} clipMode='EllipsisWithTooltip' />

                                        <ColumnDirective field='ServiceStopDate' textAlign='Left' width={80} clipMode='EllipsisWithTooltip' />
                                        <ColumnDirective field='inactiveSince' textAlign='Left' width={80} clipMode='EllipsisWithTooltip' />
                                        <ColumnDirective field='sendChanges' textAlign='Left' width={60} clipMode='EllipsisWithTooltip' />
                                        <ColumnDirective field='productId' textAlign='Left' width={40} clipMode='EllipsisWithTooltip' />


                                   </ColumnsDirective>

                                   <Inject services={[Filter, Sort, VirtualScroll, Resize, InfiniteScroll, ContextMenu]} />
                              </GridComponent>
                         }

                    </div>



                    <div className="row footer" ref={divFooterRef}>
                         <p><b>footer</b> (fixed height)</p>
                    </div>
               </div>




          </div>


     );
}

export default App;

