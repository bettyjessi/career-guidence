"use client"
import { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { supabase } from '@/lib/supabaseClient'

const HomeComponent = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [userAge, setUserAge] = useState<number | null>(null);
  const [mbtiResult, setMbtiResult] = useState('');
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserAge() {
      const user = await supabase.auth.getUser();
      if (user && user.data && user.data.user) {
        const id = user.data.user.id;
        setUserId(id);
        const { data, error } = await supabase
          .from('profiles')
          .select('date_of_birth')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching user age:', error);
        } else {
          const birthDate = new Date(data.date_of_birth);
          const age = new Date().getFullYear() - birthDate.getFullYear();
          setUserAge(age);
        }
      }
    }

    fetchUserAge();
  }, []);

  useEffect(() => {
    async function fetchQuestions() {
      if (userAge !== null) {
        const { data, error } = await supabase
          .from('mbti_questions')
          .select('*')
          .gte('age_from', userAge);

        if (error) {
          console.error('Error fetching questions:', error);
        } else {
          // Shuffle and select 20 random questions
          const shuffled = data.sort(() => 0.5 - Math.random());
          const selectedQuestions = shuffled.slice(0, 20);
          setQuestions(selectedQuestions);
        }
      }
    }

    fetchQuestions();
  }, [userAge]);

  interface Answers {
    [key: number]: number;
  }

  const handleAnswerChange = (questionId: number, value: number): void => {
    setAnswers((prevAnswers: Answers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const handleSubmit = async () => {
    const resultArray: string[] = [];

    questions.forEach((question) => {
      const answer = answers[question.id];
      if (answer === 2 || answer === 1) {
        resultArray.push(question.trait_alpha);
      } else if (answer === -1 || answer === -2) {
        resultArray.push(question.trait_beta);
      } else if (answer === 0) {
        resultArray.push(question.trait_alpha, question.trait_beta);
      }
    });

    const mbti = calculateMBTI(resultArray);
    setMbtiResult(mbti);

    if (userId) {
      const { error } = await supabase
        .from('profiles')
        .update({ mbti_personality: mbti })
        .eq('id', userId);

      if (error) {
        console.error('Error updating MBTI personality:', error);
      } else {
        console.log('MBTI personality updated successfully');
      }
    }
  };

  interface Traits {
    E: number;
    I: number;
    S: number;
    N: number;
    T: number;
    F: number;
    J: number;
    P: number;
    [key: string]: number;
  }

  const calculateMBTI = (resultArray: string[]): string => {
    const traits: Traits = {
      E: 0,
      I: 0,
      S: 0,
      N: 0,
      T: 0,
      F: 0,
      J: 0,
      P: 0,
    };

    resultArray.forEach((trait) => {
      traits[trait]++;
    });

    const mbti = [
      traits.E >= traits.I ? 'E' : 'I',
      traits.S >= traits.N ? 'S' : 'N',
      traits.T >= traits.F ? 'T' : 'F',
      traits.J >= traits.P ? 'J' : 'P',
    ].join('');

    return mbti;
  };

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-4">Home</h2>
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Multiple Choice Quiz</h1>
          <p className="text-muted-foreground">Select the correct answer for each question and click submit.</p>
        </div>
        <div className="space-y-4">
          {questions.map((question) => (
            <div key={question.id}>
              <h2 className="text-xl font-semibold mb-2">{question.question}</h2>
              <RadioGroup
                className="space-y-2"
                onValueChange={(value) => handleAnswerChange(question.id, parseInt(value))}
              >
                <Label htmlFor={`q${question.id}-a1`} className="flex items-center gap-2 cursor-pointer">
                  <RadioGroupItem id={`q${question.id}-a1`} value="2" />
                  Strongly Agree
                </Label>
                <Label htmlFor={`q${question.id}-a2`} className="flex items-center gap-2 cursor-pointer">
                  <RadioGroupItem id={`q${question.id}-a2`} value="1" />
                  Agree
                </Label>
                <Label htmlFor={`q${question.id}-a3`} className="flex items-center gap-2 cursor-pointer">
                  <RadioGroupItem id={`q${question.id}-a3`} value="0" />
                  Neutral
                </Label>
                <Label htmlFor={`q${question.id}-a4`} className="flex items-center gap-2 cursor-pointer">
                  <RadioGroupItem id={`q${question.id}-a4`} value="-1" />
                  Disagree
                </Label>
                <Label htmlFor={`q${question.id}-a5`} className="flex items-center gap-2 cursor-pointer">
                  <RadioGroupItem id={`q${question.id}-a5`} value="-2" />
                  Strongly Disagree
                </Label>
              </RadioGroup>
            </div>
          ))}
        </div>
        <Button type="button" className="w-full" onClick={handleSubmit}>
          Submit Quiz
        </Button>
        {mbtiResult && (
          <div className="mt-4">
            <h2 className="text-2xl font-bold">Your MBTI Personality Type: {mbtiResult}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export { HomeComponent };
