import { Button } from "../ui/button";

interface IHeaderProps {
    setOpenModal : ()=> void
}

export default function HeaderProduct ({setOpenModal}:IHeaderProps ) {


    return(
        <section className="bg-slate-400">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-[22px] font-bold ml-4 p-2">Users</h1>
          <Button 
            className="text-[18px] font-bold m-5 p-3 bg-blue-700 text-white mr-5" 
            onClick={setOpenModal}
          >
            +Add User
          </Button>
        </div>
      </section>
    )
    
}