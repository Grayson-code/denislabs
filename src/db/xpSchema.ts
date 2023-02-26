// Copyright (c) 2023 Northern Star
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    xp: {
        type: Number,
        required: true,
    },
    level: {
        type: Number,
        required: true,
    }
})

export default mongoose.model('xp', schema)