export default function SEOChecklist({wordCount}){

const checks=[
{label:"Meta Title present",ok:true},
{label:"Meta Description present",ok:true},
{label:"3+ H2 headings",ok:true},
{label:"FAQ section included",ok:false},
{label:"Conclusion section",ok:true},
{label:`Word count (${wordCount}+)`,ok:wordCount>=800}
]

return(

<div className="bg-white p-6 rounded shadow">

<h3 className="font-bold mb-4">SEO Checklist</h3>

{checks.map((c,i)=>(
<div key={i} className="flex gap-2">

<span className={c.ok?"text-green-500":"text-gray-400"}>
{c.ok?"✓":"○"}
</span>

<span>{c.label}</span>

</div>
))}

</div>

)
}