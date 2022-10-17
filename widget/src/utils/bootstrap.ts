interface SetupProps {
  onProduction: () => void;
  onDevelopment: () => void;
}

export function setup({  onProduction, onDevelopment }: SetupProps) {
  if(process.env.NODE_ENV !== 'production'){
    onDevelopment
    return;
  }

  onProduction()
}