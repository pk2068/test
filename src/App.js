import './App.css';
import dataA from './dataSource.json';
import dataB from './dataSource2.json';
import { React, useState } from "react";
//import { ColumnsDirective, ColumnDirective, Filter } from "@syncfusion/ej2-react-grids";
import {   ColumnDirective, ColumnsDirective, Inject, Filter,
  Sort, Resize, VirtualScroll, InfiniteScroll, ContextMenu
} from '@syncfusion/ej2-react-grids';
import { UniversalGrid, DefaultSettings  } from "@mscrmaddons/components";
import { DefaultButton } from "@fluentui/react";
import { registerLicense } from '@syncfusion/ej2-base';


registerLicense('ORg4AjUWIQA/Gnt2VVhjQlFac11JXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0VgWH9ac3JVQWNVWEQ=');

function App() {

  const [data, setData] = useState(() => dataA);

  const changeData = (e) => {
    if (data.length === dataA.length)
      setData(dataB)
    else
      setData(dataA);
  }

  const columnProps =
                    (
                        <ColumnsDirective>
                            <ColumnDirective field='id' headerText='ID' textAlign='Left' width={50} isPrimaryKey={true} clipMode='EllipsisWithTooltip' />
                            <ColumnDirective field='serviceName' headerText='Name' textAlign='Left' width={150} clipMode='EllipsisWithTooltip'
                                 />
                            <ColumnDirective field='userName' headerText='User' textAlign='Left' width={200} clipMode='EllipsisWithTooltip' a />
                            <ColumnDirective field='createdon' headerText='Created' textAlign='Left' width={70}
                                 />
                            <ColumnDirective field='organizationName' headerText='Organization' textAlign='Left' width={150} />
                            <ColumnDirective field='instanceName' headerText='Instance' textAlign='Left' width={100} clipMode='EllipsisWithTooltip' />
                            <ColumnDirective field='ServiceStopDate' type="date" headerText='Stop Date' textAlign='Left' width={100} clipMode='EllipsisWithTooltip'
                                 />
                            <ColumnDirective field='discoveryWebServiceUrl' headerText='Discovery Web Service Url' textAlign='Left' width={350} clipMode='EllipsisWithTooltip' />
                            <ColumnDirective field='ServiceStatusDescription' headerText='Status Description' textAlign='Left' width={250} clipMode='EllipsisWithTooltip' allowResizing={true} />
                            <ColumnDirective field='inactiveSince' type="date" headerText='Inactive Since' textAlign='Center' width={70}
                                 clipMode='EllipsisWithTooltip' />
                            <ColumnDirective field='licenseKey' textAlign='Center'
                                headerText='License Key' width={100} clipMode='EllipsisWithTooltip'                                
                                headerTextAlign='Left'
                                filter={{ type: 'CheckBox' }} />

                            <ColumnDirective field='subscriptionNumber' headerText='SubscriptionNumber' textAlign='Center' width={150}
                                 />
                            <ColumnDirective field='validDate' type="date" headerText='Expired(valid)' textAlign='Center' width={100}
                                 />
                            <ColumnDirective field='purchased' headerText='Purchased' textAlign='Center' width={80} clipMode="EllipsisWithTooltip" />
                            <ColumnDirective field='count' headerText='Site Licenses' textAlign='Center' width={150} clipMode="EllipsisWithTooltip" />
                            <ColumnDirective field='crmVersion' headerText='CRM Version' clipMode='EllipsisWithTooltip'
                                textAlign='Left' width={100}  />
                            <ColumnDirective field='sendChanges' headerText='Send Changes' textAlign='Center' width={70}
                                 clipMode='EllipsisWithTooltip' />
                            <ColumnDirective field='disabled' headerText='disabled' textAlign='Center' width={70}
                                 clipMode='EllipsisWithTooltip' />

                        </ColumnsDirective>
                    );

  // let mysett = { ...DefaultSettings };
  // mysett.allowSorting = true;
  // mysett.enableSorting = true;
  // mysett.enableFilter = true;
  // mysett.enableSearch = false;
  


  return (
    <div className="App">
      <p>Testing the new UniversalGrid component</p>
      <h1>{dataA.length}</h1>
      <h1>{dataB.length}</h1>
      <p>Trigger Changes</p>
      <DefaultButton text={"Change Data"} onClick={changeData} /> 
      {/* <UniversalGrid debug={true} dataSource={data} /> */}

      <UniversalGrid debug={true}  dataSource={data} 
      injections={[Filter, Sort, VirtualScroll, Resize, InfiniteScroll, ContextMenu] }  
      columns={columnProps}/>
      
      

    </div>

  );

  //const [value, SetValue] = useState(initialState)

  //     const [data, setData] = useState(data1);

  //     return (        <div className="App">            <p>Testing the new UniversalGrid component</p>            <h1>{data1.length}</h1>            <h1>{data2.length}</h1>            <p>Trigger Changes</p>

  //             <DefaultButton text={"Update DS"} onClick={() => setData(data2)}/>

  //             <UniversalGrid debug={true}  dataSource={data} injections={[Filter]} columns={(

  //                 <ColumnsDirective>                    <ColumnDirective field={"id"}/>                    <ColumnDirective field={"serviceName"}/>                    <ColumnDirective field={"instanceName"}/>                </ColumnsDirective>

  //             )}/>

  //         </div>    );
}

export default App;

