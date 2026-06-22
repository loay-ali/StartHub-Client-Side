export default function Countries({value,className,onChange}:{value?:string,className?:string,onChange:Function|undefined}) {
    const countries = {
        'eg': 'Egypt',
        'ksa': 'Kingdom Saudi Arabia',
        'uae': "United Arabian Emirates",
        'lyb': 'Lybia',
        'mor': "Morocco",
        'tun': 'Tunsia',
        'alg': "Algeria",
        'sud': "Sudan",
        'pal': "Palestine",
        'syr': "Syria",
        'irq': "Iraq",
        'leb': "Lebanon",
        "yam": "Yaman",
        "qat": "Qatar",
        "kwa": "Kewait",
        "oma": "Oman"
    };
    
    return (
        <select defaultValue = {value} onChange = {(ele) => onChange?.(ele)} className = {className}>
            {Object.entries(countries).map(country => {
                return (
                    <option value = {country[0]}>
                        {country[1]}
                    </option>
                );
            })}
        </select>
    );
}