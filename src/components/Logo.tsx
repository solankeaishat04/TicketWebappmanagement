import React from "react";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-1 max-w-[282px] bg-white">
      
        <img
  src="/images/ticket_management_app_logo_triangular_tickets-removebg-preview.svg"
  alt="TicketWeb logo"
  className="h-32 md:h-16 w-16"
/>

            <span className="text-2xl font-semibold">TicketMaster</span>
      </div>
     
    
  );
};

export default Logo;
