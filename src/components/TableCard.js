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

import React from 'react';
import '../App.css';
import { Typography, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Paper, Grid } from '@material-ui/core';
import DeleteIcon from "@material-ui/icons/Delete";

const TableCard = ({
  data,
  removeAction
}) => {
  return (
    <Grid item xs={12}>
      <Paper className="card">
        {data.length > 0 ?
          <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map( item => {
              return (
                <TableRow key={item.id}>
                  <TableCell>
                    {item.itemName}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={()=>removeAction(item.id)}
                    > 
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            }) }
              
          </TableBody>
        </Table>
      : <Typography>You have not created any items</Typography>}
    </Paper>
    </Grid>
  )
}

export default TableCard
