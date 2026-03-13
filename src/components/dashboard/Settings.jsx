import { useState } from "react"

export default function Settings(){

const [name,setName] = useState(localStorage.getItem("user_name") || "")
const [email,setEmail] = useState(localStorage.getItem("user_email") || "")

const saveSettings = () => {

localStorage.setItem("user_name",name)
localStorage.setItem("user_email",email)

alert("Settings Saved!")

}

return(

<div className="max-w-xl bg-white p-6 rounded-xl shadow">

<h2 className="text-2xl font-bold mb-6">
User Settings
</h2>

<div className="space-y-4">

<div>
<label className="block text-sm mb-1">Name</label>
<input
value={name}
onChange={(e)=>setName(e.target.value)}
className="w-full border p-3 rounded"
/>
</div>

<div>
<label className="block text-sm mb-1">Email</label>
<input
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="w-full border p-3 rounded"
/>
</div>

<button
onClick={saveSettings}
className="bg-blue-600 text-white px-6 py-2 rounded"
>
Save Settings
</button>

</div>

</div>

)

}