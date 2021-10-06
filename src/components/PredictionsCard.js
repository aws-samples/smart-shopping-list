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

import React, { useState } from 'react';
import '../App.css';
import { Button, Grid, Paper, CircularProgress } from '@material-ui/core';
import { getLabelsFromImage } from '../api/predictions'

const PredictionsCard = ({
  addAction
}) => {
  const [labels, setLabels] = useState([])
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState(null)

  return (
    <Grid item xs={12}>
        <Paper className="card">
          <Grid item xs={12} style={{paddingBottom: '10px'}}>
            <b>Use AI Object Detection to Add New Items</b>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              component="label"
            >
              Upload File
              <input
                type="file"
                style={{ display: "none" }}
                onChange={async (event)=>{
                  const file = event.target.files[0]
                  
                  if (file.size > 5000000) {
                    alert("Image is too large!")
                    return
                  }
                  
                  if (!["jpg", "jpeg", "png"].includes(file.name.split(".")[1])){
                    alert("File type incorrect!")
                    return
                  }
                  
                  setFileName(file.name)
                  setLoading(true)
                  
                  setLabels(await getLabelsFromImage(file))
                  
                  setLoading(false)
                }}
              />
            </Button>
            <span style={{paddingLeft: '10px'}}>{fileName ? fileName : null}</span>
          </Grid>
          <Grid item xs={12} style={{marginTop: '10px'}}>
            { loading ?
              <CircularProgress color="secondary" />
              :
              labels.map(label => (
                <Button
                  onClick={()=>{
                    addAction(label)
                  }}
                >{label}</Button>
              ))
            }
          </Grid>
        </Paper>
      </Grid>
  )
}

export default PredictionsCard
