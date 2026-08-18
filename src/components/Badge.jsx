function Badge({label, variant}){

    const Variants = {
        suspicious: "bg-red-100 text-suspicious",
        success: "bg-green-100 text-success",
        warning: "bg-amber-100 text-warning",
    };

    return(
        <span className = {`inline-block px-2 py-1 rounded-full text-xs font-semibold ${Variants[variant]}`}>
            {label}
        </span>
    )
};

export default Badge;