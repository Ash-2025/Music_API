const supabase = require('@supabase/supabase-js')
require('dotenv').config()
const supabase_url = process.env.SUPABASE_URL
const supabase_key = process.env.SUPABASE_KEY

const supaclient = supabase.createClient(supabase_url,supabase_key);

module.exports = supaclient

