/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT-0
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import React, { useEffect, useState } from 'react';
import './App.css';

import { getUserItems, deleteItem, addItem } from './api/db'
import TableCard from './components/TableCard'
import NavBar from './components/NavBar'
import AddItemCard from './components/AddItemCard'
import PredictionsCard from './components/PredictionsCard'
// import { Hub } from 'aws-amplify';
import { Grid } from '@material-ui/core'


function App() {

  const [items, setItems] = useState([])

  useEffect(() => {
    fetchData()

  }, [])

  async function fetchData() {
    setItems(await getUserItems())
  }
  
  /*
  Hub.listen('auth', (data) => {
    if (data.payload.event === 'signIn') {
      fetchData()
    }
  });
  */

  return (
    <div className="app">
      <NavBar />
      
      <div className="content">
        <Grid container spacing={3}>
        
            <AddItemCard 
              addAction = {
                async (itemName) => {
                  const response = await addItem(itemName)
                  
                  if (response){
                    setItems([...items, response])  
                  }
                  
                }
              }     
            />
            
            <PredictionsCard 
              addAction = {
                async (itemName) => {
                  const response = await addItem(itemName)
                
                  if (response){
                    setItems([...items, {
                      timestamp: new Date().getTime(),
                      itemName
                    }])
                  }
                }
              }
            />
            
           <TableCard 
              data={items}
              removeAction={async (id)=>{
                const response = await deleteItem(id)
                if (response) {
                  setItems(items.filter(item => item.id !== id))  
                }
              }}
            />
        </Grid>
      </div>
    </div>
  );
}

export default App;
