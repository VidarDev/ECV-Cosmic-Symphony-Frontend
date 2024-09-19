import useStore from '@/hooks/useStore';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const QualitySetting: React.FC = () => {
  // Stores
  const userSettings = useStore((state) => state.userSettings);
  const updateUserSetting = useStore((state) => state.updateUserSetting);

  return (
    <div className="z-10 fixed top-0 right-0 flex items-center justify-end gap-2 p-4 lg:p-6 max-w-[33vw] flex-wrap">
      <Select
        value={userSettings.resolutionQuality}
        onValueChange={(value: 'Low' | 'Medium' | 'High') =>
          updateUserSetting('resolutionQuality', value)
        }
      >
        <SelectTrigger className="text-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default QualitySetting;
