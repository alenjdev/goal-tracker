import { useEffect, useState } from 'react';
import './App.css';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { theme } from './styles/theme';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { colors, common, severities } from './styles';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { showInfo } from './utils/showInfo';
import { showError } from './utils/showError';
import { differenceInCalendarDays } from 'date-fns';

const postGoal = async (goal: any) => {
  const response = await fetch(
    'https://x8ki-letl-twmt.n7.xano.io/api:tDmGDyDo/weight_goals',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(goal),
    }
  );

  const data = await response.json();

  return data;
};

const getGoals = async () => {
  const response = await fetch(
    'https://x8ki-letl-twmt.n7.xano.io/api:tDmGDyDo/weight_goals'
  );

  const data = await response.json();

  return data;
};

const postLog = async (log: any) => {
  const response = await fetch(
    'https://x8ki-letl-twmt.n7.xano.io/api:tDmGDyDo/goal_logs',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(log),
    }
  );

  const data = await response.json();

  return data;
};

const getLogs = async () => {
  const response = await fetch(
    'https://x8ki-letl-twmt.n7.xano.io/api:tDmGDyDo/goal_logs'
  );

  const data = await response.json();

  return data;
};

function App() {
  const [open, setOpen] = useState(false);
  const [logOpen, setLogOpen] = useState(false);

  const [goalDate, setGoalDate] = useState(new Date());
  const [goalName, setGoalName] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [goalList, setGoalList] = useState([]);
  const [goalId, setGoalId] = useState();

  const [currentWeight, setCurrentWeight] = useState(0);

  const [currentWeightForGoal, setCurrentWeightForGoal] = useState(0);

  const [logWeight, setLogWeight] = useState('');

  const [logList, setLogList] = useState([]);

  useEffect(() => {
    getGoals().then((data) => {
      setGoalList(data);
    });
    getLogs().then((data) => {
      setLogList(data);
    });
  }, []);

  const handleOnLogSave = async () => {
    try {
      if (!goalId) {
        showError('No goal selected');
        return;
      }
      if (!logWeight) {
        showError('No weight entered');
        return;
      }
      const log = {
        current_weight: logWeight,
        goal_id: goalId,
      };

      const response = await postLog(log);

      console.log(response);
      showInfo('Log created successfully');
      setLogWeight('');
      setGoalId(undefined);
      setLogOpen(false);
      getLogs().then((data) => {
        setLogList(data);
      });
    } catch (error) {
      showError('Error creating log');
    }
  };

  const handleOnSave = async () => {
    try {
      const goal = {
        target_date: goalDate,
        target_weight: targetWeight,
        goal_name: goalName,
        current_weight: currentWeightForGoal,
        user_id: 1,
      };

      const response = await postGoal(goal);

      console.log(response);
      showInfo('Goal created successfully');
      setOpen(false);
    } catch (error) {
      showError('Error creating goal');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box display={'flex'}>
        <Typography variant='h1'>Goals</Typography>
        <IconButton color='primary' size='large' onClick={() => setOpen(true)}>
          <AddCircleIcon />
        </IconButton>
      </Box>
      <Box>
        {goalList.map((goal: any) => {
          const daysLeft = differenceInCalendarDays(
            new Date(goal.target_date),
            new Date()
          );

          const latestLog = logList
            .filter((_) => _.goal_id === goal.id)
            .sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )[0];

          const weightLost = goal.current_weight - latestLog?.current_weight;

          const weightToLose = goal.current_weight - goal.target_weight;

          const completion = (weightLost / weightToLose) * 100;

          return (
            <Box
              key={goal.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                padding: 1,
                border: '1px solid',
                borderColor: colors.lightSteelBlue,
                borderRadius: 4,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Typography variant='h2'>{goal.goal_name}</Typography>
                <IconButton
                  color='primary'
                  size='large'
                  onClick={() => {
                    setLogOpen(true);
                    setGoalId(goal.id);
                  }}
                >
                  <AddCircleIcon />
                </IconButton>
              </Box>
              <Typography variant='h3'>
                Target weight: {goal.target_weight}
              </Typography>
              <Typography variant='h3'>
                Target date: {new Date(goal.target_date).toLocaleDateString()}
              </Typography>
              <Typography variant='h3'>
                Weight to lose:{' '}
                {`${goal.current_weight - goal.target_weight} lbs`}
              </Typography>
              <Typography
                color={weightLost < 0 ? severities.warning : severities.success}
                variant='h3'
              >
                Weight lost: {`${weightLost} lbs`}
              </Typography>
              <Typography variant='h3'>Days left: {daysLeft}</Typography>
              <Typography variant='h3'>
                Completion: {completion.toFixed(1)}%
              </Typography>
              <Typography variant='h3'></Typography>
              <Divider />
              {logList
                .filter((log: any) => log.goal_id === goal.id)
                .map((log: any) => {
                  return (
                    <Box
                      key={log.id}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}
                    >
                      <Typography variant='h4'>
                        {new Date(log.created_at).toLocaleDateString()}
                      </Typography>
                      <Typography variant='h4'>{log.current_weight}</Typography>
                    </Box>
                  );
                })}
            </Box>
          );
        })}
      </Box>
      <Modal
        open={logOpen}
        onClose={() => setLogOpen(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        sx={{
          display: 'flex',
          placeItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            backgroundColor: common.cardBG,
            width: '90%',
            display: 'flex',
            flexDirection: 'column',
            padding: '12px',
            gap: 1,
          }}
        >
          <Typography variant='h2'>Add Entry</Typography>

          <TextField
            label='Weight'
            value={logWeight}
            onChange={(e) => setLogWeight(e.target.value)}
          />
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Button>Cancel</Button>
            <Button
              onClick={handleOnLogSave}
              variant='contained'
              color='primary'
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        sx={{
          display: 'flex',
          placeItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            backgroundColor: common.cardBG,
            width: '90%',
            display: 'flex',
            flexDirection: 'column',
            padding: '12px',
            gap: 1,
          }}
        >
          <Typography variant='h2'>Set new goal</Typography>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label='Goal Date'
              onChange={(date) => {
                const d = new Date(date['$d']).toISOString();

                setGoalDate(d);
              }}
            />
          </LocalizationProvider>

          <TextField
            label='Goal Name'
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
          />
          <TextField
            label='Target weight'
            value={targetWeight}
            onChange={(e) => setTargetWeight(e.target.value)}
          />
          <TextField
            label='Current weight'
            value={currentWeightForGoal}
            onChange={(e) => setCurrentWeightForGoal(e.target.value)}
          />
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Button>Cancel</Button>
            <Button onClick={handleOnSave} variant='contained' color='primary'>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}

export default App;
