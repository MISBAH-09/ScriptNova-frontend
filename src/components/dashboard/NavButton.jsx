export default function NavButton({active,onClick,icon,label}){

return(

<button
onClick={onClick}
className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg
${active
? "bg-blue-600 text-white"
: "text-gray-300 hover:bg-slate-700"
}`}
>

<span>{icon}</span>
<span>{label}</span>

</button>

)
}